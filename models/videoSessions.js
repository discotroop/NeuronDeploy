const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

// Video Session will take in an info object which contains
// the Date time info
// the users info
// the subject info

// ESSENTIAL FUNCTION
// Video Session will generate a unique ID which will be used as the URL

const VideoSession = new Schema({
  info: { type: Object },
  id: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model("VideoSession", VideoSession);
