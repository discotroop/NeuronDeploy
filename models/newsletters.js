const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const NewsletterSchema = new Schema({
  title: { type: String, required: true },
  newsletter_URL: { type: String, slug: "title" },

  // might use later
  author: { type: Schema.Types.ObjectId, reg: "User" },
  editions: [{ type: Schema.Types.ObjectId, reg: "Edition" }]
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);
