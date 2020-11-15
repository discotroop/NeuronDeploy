// Import article Schema
const Article = require("../models/articles");
// Import createCalendarEvent for matching users.
const { createCalendarEvent } = require("../callCalendar");

// Import videoSessionController to add video sessions
const VideoSessionController = require("./videoSessionController");
const VideoSession = require("../models/videoSessions");

// handle Article Creation
// Recieve a HTTP request.
createArticle = async (req, res) => {
  // Get the body of the request
  const body = req.body;

  // If there is no information provided the article is not created
  if (!body) {
    return res.state(400).json({
      success: false,
      error: "You must provide a Article"
    });
  }

  // Create new instance of an article
  const article = new Article(body);

  // Error handling for improperly formated request bodies.
  if (!article) {
    return res.states(400).json({ success: false, error: err });
  }

  // Save new article to the database and return a copy.
  article.save().then(() => {
    return res.status(200).json({
      success: true,
      id: article._id,
      message: "Article Added!",
      article: article,
      url: article.article_URL
    });
  });
};

// handle Article update
updateArticle = async (req, res) => {
  const body = req.body;

  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  // here ?
  Article.findOne({ _id: req.params.id }, (err, article) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Article not found!"
      });
    }
    // just do name for now

    if (body.title) {
      article.title = body.title;
    }

    if (body.reset) {
      (article.unMatched = []), (article.matched = []);
    }

    //// !!!IMPORTANT!!! ////
    // check for passed in unMatched times
    if (body.unMatched) {
      let alreadyMatchedEmails = []; /* array to hold emails of users that have already matched with new user */
      // If: there are no unmatched times simply add the new times to article.unMatched.
      if (article.unMatched.length === 0) {
        body.unMatched.forEach(match => article.unMatched.push(match));
        // Else: Look for potential matches
      } else {
        let newTimes = body.unMatched;
        newTimes.forEach(match => {
          // get unMatched times from article that are from same day as a match.
          let matchedByDay = article.unMatched.filter(function(articleMatch) {
            return articleMatch.day === match.day;
          });
          // Attempt to filter emails:
          let filterEmails = matchedEmail =>
            alreadyMatchedEmails.filter(function(email) {
              return email === matchedEmail;
            });
          // console.log(filterEmails());

          // Check for time slot matches in days that match.
          for (let i = 0; i < matchedByDay.length; i++) {
            // If times match and email does not match we have a match.
            // Need to also filter for matching the same person more than once by email.
            let checkForEmailRedundancy = filterEmails(matchedByDay[i].email);
            if (
              match.timeSlot === matchedByDay[i].timeSlot &&
              match.email !== matchedByDay[i].email &&
              checkForEmailRedundancy.length === 0
            ) {
              console.log("match", match.email);
              console.log("matchedby", matchedByDay[i].email);
              // Toggle Matched status on match
              match.isMatched = true;
              matchedByDay[i].isMatched = true;
              console.log(matchedByDay[i]);

              // Add Matching emails to each matched item
              match.matchedEmail = matchedByDay[i].email;

              let videoSession = new VideoSession();
              videoSession.save();
              console.log(videoSession);
              // BUILD EVENT DATA OBJECT
              let eventData = {
                email1: match.email,
                email2: match.matchedEmail,
                dtStart: match.start,
                dtEnd: match.end
                // videoInfo: newVideoInfo
              };
              // CREATE CALENDAR EVENT
              createCalendarEvent(eventData);
              alreadyMatchedEmails.push(matchedByDay[i].email);
              console.log("already matched", alreadyMatchedEmails);

              // Push matched times to article.matched
              // Only need to push one with matched email
              article.matched.push(match);

              // close loop
              break;
            }
            filteredEmailsArray = [];
          }
          // set unMatched to only hold items with isMatched = false
          let newUnmatched = article.unMatched.filter(function(matched) {
            return matched.isMatched === false;
          });
          // Reset article to zero and repopulate. Otherwise it hangs on to matches it should not.
          article.unMatched = [];
          newUnmatched.forEach(function(item) {
            article.unMatched.push(item);
          });
        });
        // push any unmatched new items to unMatched
        // This is double parking... aka wrong!
        let newItems = body.unMatched.filter(function(item) {
          return item.isMatched === false;
        });
        newItems.forEach(function(item) {
          article.unMatched.push(item);
        });
      }
      console.log("article after loop", article);
    }

    // Push all changes to the server
    article.save(function(err) {
      if (err) {
        return err;
      } else {
        return res.status(200).json({
          success: true,
          id: article._id,
          message: "Article updated",
          new: article
        });
      }
    });
  });
};

// Handle Article delete
deleteArticle = async (req, res) => {
  await Article.findOneAndDelete({ _id: req.params.id }, (err, article) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!article) {
      return res
        .status(404)
        .json({ success: false, error: "Article not found " });
    }
    return res.status(200).json({ success: true, data: article });
  }).catch(err => console.log(err));
};

getArticleByName = async (req, res) => {
  await Article.find(
    // add more to select
    {
      article_URL: req.params.article_URL
      // edition_URL: req.params.edition_URL,
      // newsletter_URL: req.params.newsletter_URL
    },
    (err, article) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!article) {
        return res
          .status(404)
          .json({ success: false, error: "Article not Found" });
      }
      console.log(article);
      if (article.length > 1) {
        console.log("oh dear");
      } else {
        return res.status(200).json({ success: true, data: article });
      }
      // return res.status(200).json({ success: true, data: article });
    }
  ).catch(err => console.log(err));
};
getArticleByShortName = async (req, res) => {
  console.log(req.params);
  await Article.find(
    // add more to select
    {
      article_Short_URL: req.params.Article_Short_URL
      // edition_URL: req.params.edition_URL,
      // newsletter_URL: req.params.newsletter_URL
    },
    (err, article) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!article) {
        return res
          .status(404)
          .json({ success: false, error: "Article not Found" });
      }

      return res.status(200).json({ success: true, data: article });

      // return res.status(200).json({ success: true, data: article });
    }
  ).catch(err => console.log(err));
};

getArticleById = async (req, res) => {
  await Article.findOne(
    // add more to select
    {
      _id: req.params.id
    },
    (err, article) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!article) {
        return res
          .status(404)
          .json({ success: false, error: "Article not Found" });
      }
      return res.status(200).json({ success: true, data: article });
    }
  ).catch(err => console.log(err));
};

getArticles = async (req, res) => {
  await Article.find({}, (err, articles) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!articles.length) {
      return res
        .status(404)
        .json({ success: false, error: "Articles not found" });
    }
    return res.status(200).json({ success: true, data: articles });
  });
};

checkForMatches = async (req, res) => {
  await Article.findOne(
    // add more to select
    {
      _id: req.params.id
    },
    (err, article) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!article) {
        return res
          .status(404)
          .json({ success: false, error: "Article not Found" });
      }
      console.log(article.unmatched, article.matched);
      return res.status(200).json({ success: true, data: article });
    }
  ).catch(err => console.log(err));
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles,
  getArticleByName,
  getArticleById,
  getArticleByShortName
};
