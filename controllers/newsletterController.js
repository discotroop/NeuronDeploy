const Newsletter = require("../models/newsletters");

// handle Newsletter Creation
createNewsletter = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.state(400).json({
      success: false,
      error: "You must provide a newsletter"
    });
  }
  const newsletter = new Newsletter(body);

  if (!newsletter) {
    return res.states(400).json({ success: false, error: err });
  }

  newsletter.save().then(() => {
    return res.status(200).json({
      success: true,
      id: newsletter._id,
      message: "Newsletter Added!",
      newsletter: newsletter
    });
  });
};

// handle Newsletter update
updateNewsletter = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Newsletter.findOne({ _id: req.params.id }, (err, newsletter) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Newsletter not found!"
      });
    }
    console.log(newsletter);
    // just do name for now
    newsletter.title = body.title;
    newsletter.save(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          success: true,
          id: newsletter._id,
          message: "Newsletter updated",
          new: newsletter
        });
      }
    });
  });
};

// Add Newsletter Edition when news editions added
updateNewsletterEditions = async (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Newsletter.findOne({ _id: req.body.id }, (err, newsletter) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Newsletter not found!"
      });
    }
    console.log(newsletter);
    // just do name for now
    newsletter.editions = newsletter.editions.push(req.body.edition_id);
    newsletter.save(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          success: true,
          id: newsletter._id,
          message: "Newsletter updated",
          new: newsletter
        });
      }
    });
  });
};

// Handle Newsletter delete
deleteNewsletter = async (req, res) => {
  await Newsletter.findOneAndDelete(
    { _id: req.params.id },
    (err, newsletter) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!newsletter) {
        return res
          .status(404)
          .json({ success: false, error: "Newsletter not found " });
      }
      return res.status(200).json({ success: true, data: newsletter });
    }
  ).catch(err => console.log(err));
};

getNewsletterByURL = async (req, res) => {
  await Newsletter.findOne(
    { newsletter_URL: req.params.newsletter_URL },
    (err, newsletter) => {
      console.log(newsletter);
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!newsletter) {
        return res
          .status(404)
          .json({ success: false, error: "Newsletter not Found" });
      }
      return res.status(200).json({ success: true, data: newsletter });
    }
  ).catch(err => console.log(err));
};

getNewsletterById = async (req, res) => {
  await Newsletter.find({ _id: req.params.id }, (err, newsletter) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!newsletter) {
      return res
        .status(404)
        .json({ success: false, error: "Newsletter not Found" });
    }
    return res.status(200).json({ success: true, data: newsletter });
  }).catch(err => console.log(err));
};

getNewsletters = async (req, res) => {
  await Newsletter.find({}, (err, newsletters) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!newsletters.length) {
      return res
        .status(404)
        .json({ success: false, error: "Newsletters not found" });
    }
    return res.status(200).json({ success: true, data: newsletters });
  });
};

module.exports = {
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  getNewsletters,
  getNewsletterByURL,
  getNewsletterById,
  updateNewsletterEditions
};
