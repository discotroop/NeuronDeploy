const express = require("express");
const router = express.Router();

// Require controller modules
const newsletter_controller = require("../controllers/newsletterController");
const edition_controller = require("../controllers/editionController");
const article_controller = require("../controllers/articleController");
const user_controller = require("../controllers/userController");
const video_session_controller = require("../controllers/videoSessionController");
const daily_controller = require("../Daily");

/// Newsletter Routes ///

// POST for creating newsletter
router.post("/newsletter", newsletter_controller.createNewsletter);

// PUT to update newsletter
router.put("/newsletter/:id", newsletter_controller.updateNewsletter);

// DELETE to delete newsletter
router.delete("/newsletter/:id", newsletter_controller.deleteNewsletter);

// GET to grab a newsletter by ID => this is how the admin controller will access them
//router.get("/newsletter/:id", newsletter_controller.getNewsletterById);

// GET to get newsletter from slug generated URL => this is how the client date picker will get it
router.get(
  "/newsname/:newsletter_URL",
  newsletter_controller.getNewsletterByURL
);

// GET to get list of all newsletters
router.get("/newsletters", newsletter_controller.getNewsletters);

// will be passing json back and forth ?

/// Edition Routes ///

// POST for creating editions
router.post("/edition", edition_controller.createEdition);

// PUT for updating editions
router.put("/edition/:id", edition_controller.updateEdition);

// DELETE for deleting editions
router.delete("/edition/:id", edition_controller.deleteEdition);

// GET to get edition from slug of newsletter end edition => this is how the client will get it
router.get("/edition_URL", edition_controller.getEditionByName);

// GET to get Edition from slug generated URL => this is how the client date picker will get it
router.get("/edname/:edition_URL", edition_controller.getEditionByURL);

// GET to list all editions
router.get("/editions", edition_controller.getEditions);

// Articles Routes ///

// POST for creating Articles
router.post("/article", article_controller.createArticle);

// PUT for updating Articles
router.put("/article/:id", article_controller.updateArticle);

// DELETE for deleting Articles
router.delete("/article/:id", article_controller.deleteArticle);

// GET to get Article from slug of newsletter end Article => this is how the client will get it
router.get("/select/:article_URL", article_controller.getArticleByName);

// GET to get Article by name only
router.get(
  "/name/:Article_Short_URL",
  article_controller.getArticleByShortName
);

// GET Article by ID
router.get("/article/:id", article_controller.getArticleById);

// GET to list all articless
router.get("/articles", article_controller.getArticles);

/// User Routes ///

// POST to create user
router.post("/user", user_controller.createUser);

// PUT to update user
router.put("/user/:id", user_controller.updateUser);

// DELETE to delete user
router.delete("/user/:id", user_controller.deleteUser);

// GET to get user by EMAIL
router.get("/user/:email", user_controller.getUserByEmail);

// GET to check for user EMAIL in DB
router.get("/user/check/:email", user_controller.checkUserByEmail);

// add :id get later?

// GET all user
router.get("/users", user_controller.getUsers);

// Logins and Verification
// POST to Sign In
router.post("/login", user_controller.signInUser);

// GET to check Verification
router.get("/verify", user_controller.verifyUserToken);

// POST to logut
router.get("/logout", user_controller.logoutUser);

//// VIDEO SESSION ROUTES

// POST to create video session
router.post("/videoSession", video_session_controller.createVideoSession);

// DELETE to delete video session
router.delete("/videoSession/:id", video_session_controller.deleteVideoSession);

// GET video session by ID
router.get("/videoSession/:id", video_session_controller.getVideoSessionById);

// GET to display all video Sessions
router.get("/videoSessions", video_session_controller.getVideoSessions);

// Login Page
// router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// // Register Page
// router.get("/register", forwardAuthenticated, (req, res) =>
//   res.render("register")
// );

// Video Routes ///
router.post("/video", daily_controller.createRoom);

module.exports = router;
