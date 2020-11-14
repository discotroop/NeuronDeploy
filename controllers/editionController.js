const Edition = require("../models/editions");
const EditionController = require("./editionController");

// handle Edition Creation
createEdition = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.state(400).json({
      success: false,
      error: "You must provide a Edition"
    });
  }
  const edition = new Edition(body);

  if (!edition) {
    return res.states(400).json({ success: false, error: err });
  }

  edition
    .save()
    // .then(() =>
    //   EditionController.updateEditionEditions({
    //     id: edition.edition_id,
    //     edition_id: edition._id
    //   })
    // )
    .then(() => {
      return res.status(200).json({
        success: true,
        id: edition._id,
        message: "Edition Added!",
        edition: edition
      });
    })
    .catch(error => console.log(error));
};

// handle Edition update
updateEdition = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Edition.findOne({ _id: req.params.id }, (err, edition) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Edition not found!"
      });
    }
    console.log(edition);
    // just do name for now
    edition.title = body.title;
    edition.save(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          success: true,
          id: edition._id,
          message: "Edition updated",
          new: edition
        });
      }
    });
  });
};

// Handle Edition delete
deleteEdition = async (req, res) => {
  await Edition.findOneAndDelete({ _id: req.params.id }, (err, edition) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!edition) {
      return res
        .status(404)
        .json({ success: false, error: "Edition not found " });
    }
    return res.status(200).json({ success: true, data: edition });
  }).catch(err => console.log(err));
};

getEditionByName = async (req, res) => {
  await Edition.findOne(
    { edition_URL: req.params.edition_URL },
    (err, edition) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!edition) {
        return res
          .status(404)
          .json({ success: false, error: "Edition not Found" });
      }
      return res.status(200).json({ success: true, data: edition });
    }
  ).catch(err => console.log(err));
};
getEditionByURL = async (req, res) => {
  console.log(req.params);
  await Edition.findOne(
    { edition_Short_URL: req.params.edition_URL },
    (err, edition) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!edition) {
        return res
          .status(404)
          .json({ success: false, error: "Edition not Found" });
      }
      return res.status(200).json({ success: true, data: edition });
    }
  ).catch(err => console.log(err));
};

getEditions = async (req, res) => {
  await Edition.find({}, (err, editions) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!editions.length) {
      return res
        .status(404)
        .json({ success: false, error: "Editions not found" });
    }
    return res.status(200).json({ success: true, data: editions });
  });
};

module.exports = {
  createEdition,
  updateEdition,
  deleteEdition,
  getEditions,
  getEditionByName,
  getEditionByURL
};
