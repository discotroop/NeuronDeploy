const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

// All users will require and email and a userType
// Three types, Admin, Author, Participant
// Admin can touch everything
// Author can manage their newsletters / articles / links
// Participants just have an email to match them for hang outs
// password is only needed for Authors and Admins
// newsletters are only used for Authors

// should probably think of a way to link back matches to the newsletter/editon/article
// as well for later data reporting

// moved matching to article for now

const UserSchema = new Schema({
  email: { type: String, required: true },
  user_type: { type: String, required: true },

  // to use later
  password: { type: String, required: false },
  newsletters: { type: Schema.Types.ObjectId, required: false },
  matches: { type: Array, required: false },
  signUpDate: { type: Date, default: new Date() }
});

// Generate hashed password
UserSchema.methods.generateHash = function(password) {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

// Check password validity
UserSchema.methods.validPassword = function(password) {
  return bcryptjs.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
