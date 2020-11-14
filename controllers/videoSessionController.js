const VideoSession = require("../models/videoSessions");

// handle VideoSession Creation
createVideoSession = (req, res) => {
  //   const body = req.body;

  //   if (!body) {
  //     return res.state(400).json({
  //       success: false,
  //       error: "You must provide a videoSession"
  //     });
  //   }
  const videoSession = new VideoSession();

  if (!videoSession) {
    return res.states(400).json({ success: false, error: err });
  }

  videoSession.save().then(() => {
    console.log("made session", videoSession);
    return res.status(200).json({
      success: true,
      id: videoSession._id,
      message: "VideoSession Added!",
      videoSession: videoSession
    });
  });
};

// Handle VideoSession delete
deleteVideoSession = async (req, res) => {
  await VideoSession.findOneAndDelete(
    { _id: req.params.id },
    (err, videoSession) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!videoSession) {
        return res
          .status(404)
          .json({ success: false, error: "VideoSession not found " });
      }
      return res.status(200).json({ success: true, data: videoSession });
    }
  ).catch(err => console.log(err));
};

getVideoSessionById = async (req, res) => {
  await VideoSession.find({ _id: req.params.id }, (err, videoSession) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!videoSession) {
      return res
        .status(404)
        .json({ success: false, error: "VideoSession not Found" });
    }
    return res.status(200).json({ success: true, data: videoSession });
  }).catch(err => console.log(err));
};

getVideoSessions = async (req, res) => {
  await VideoSession.find({}, (err, videoSessions) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!videoSessions.length) {
      return res
        .status(404)
        .json({ success: false, error: "VideoSessions not found" });
    }
    return res.status(200).json({ success: true, data: videoSessions });
  });
};

module.exports = {
  createVideoSession,
  deleteVideoSession,
  getVideoSessions,
  getVideoSessionById
};
