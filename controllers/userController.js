const User = require("../models/users");
const express = require("express");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const UserSession = require("../models/UserSession");
// Load User model
// const { forwardAuthenticated } = require("../config/auth");

/// hello
// TBD
// Add middleware to validate and sanitize email address for createUser and updateUser

// handle User Creation
createUser = (req, res) => {
  // Get create request
  const body = req.body;
  const { password } = body;
  let { user_type } = body;
  let { email } = body;

  // Handle no email
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }

  // Handle Admin sign up
  if (user_type === "admin") {
    // Handle no password
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    // Clean up email and check for white space.
    email = email.toLowerCase();
    email = email.trim();

    // Check for email in db.
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error",
            error: err
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Email already exists."
          });
        }

        // Save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.user_type = user_type;
        newUser.save((err, user) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed up"
          });
        });
      }
    );

    // MAKE NON ADMIN
  } else {
    const user = new User(body);

    if (!user) {
      return res.states(400).json({ success: false, error: err });
    }

    user.save().then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User Added!",
        user: user
      });
    });
  }
};

// handle User update
updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!"
      });
    }
    console.log(user);
    // just do name for now
    if (body.email) {
      user.email = body.email;
    }

    // will need to add some mix up here for dealing with edge case where
    // user attempts to re add themselves to same article
    // would be redirected from create user
    user.save(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated",
          updated_user: user
        });
      }
    });
  });
};
signInUser = async (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  // Check for email
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  // Check for password
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }
  // Clean up email
  email = email.toLowerCase();
  email = email.trim();

  // Find user in db
  User.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      } // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id
        });
      });
    }
  );
};

logoutUser = async (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error",
          error: err
        });
      }
      return res.send({
        success: true,
        message: "Good"
      });
    }
  );
};

verifyUserToken = async (req, res, next) => {
  // Get token
  const { query } = req;
  const { token } = query;
  UserSession.find({}, (err, session) => {
    console.log(session);
  });

  UserSession.findOne(
    {
      _id: token
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: server error",
          error: err
        });
      }
      if (sessions) {
        return res.send({
          success: false,
          message: "Error: invalid",
          error: err,
          sessions: sessions
        });
      } else {
        return res.send({
          success: true,
          message: "Good"
        });
      }
    }
  );
};

// Handle User delete
deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found " });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch(err => console.log(err));
};

// use to look up users
// will need these when adding new matches to avoid redundancy
getUserByEmail = async (req, res) => {
  await User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch(err => console.log(err));
};

checkUserByEmail = async (req, res) => {
  await User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(200).json({ success: true, data: "new user" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch(err => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: "Users not found" });
    }
    return res.status(200).json({ success: true, data: users });
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
  checkUserByEmail,
  signInUser,
  logoutUser,
  verifyUserToken
};
