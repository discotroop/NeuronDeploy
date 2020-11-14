// Import mongoose and schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import slug generator to make our unique URLs.
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const EditionSchema = new Schema({
  // Name of Edition
  title: { type: String, required: true },

  // The slug of the newsletter that this is an edition of
  newsletter_URL: {
    type: Schema.Types.String,
    reg: "URL_String",
    required: true
  },

  // The slug of the edition and newsletter slug
  // This is required to pass to articles that use the /select/newsletter-name-edition-article-name URL format
  edition_URL: {
    type: String,
    slug: ["newsletter_URL", "title"],
    unique: true
  },
  // The editions slug by itself
  // This is required to use with the /newsletter-name/edition-name/article-name URL format.
  edition_Short_URL: { type: String, slug: "title" },
  // Generate a unique ID # using Schema.Types.ObjectId
  newsletter_id: { type: Schema.Types.ObjectId, required: true },

  // Unused but might require later.
  articles: [{ type: Schema.Types.ObjectId, reg: "Article" }],
  date: { type: Date }
});

module.exports = mongoose.model("Edition", EditionSchema);
