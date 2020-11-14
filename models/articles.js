const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

// Requires title, and ids for edition and newsletter
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  edition_URL: { type: String, req: "edition_URL", required: true },
  article_URL: { type: String, slug: ["edition_URL", "title"], unique: true },
  article_Short_URL: { type: String, slug: "title" },

  // matches will be array of objects for participants
  // each match needs:
  // user email: string
  // matched email: string
  // isMatched: boolean
  // time: luxon date
  unMatched: { type: Array },
  matched: { type: Array },

  // might need later
  edition_id: {
    type: Schema.Types.ObjectId,
    reg: "Edition",
    required: true
  },
  newsletter_id: {
    type: Schema.Types.ObjectId,
    req: "Newsletter",
    required: true
  },
  newsletter_title: { type: String, required: true },
  edition_title: { type: String, required: true },
  date: { type: Date }
});

module.exports = mongoose.model("Article", ArticleSchema);
