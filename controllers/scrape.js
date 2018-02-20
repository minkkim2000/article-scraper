var db = require("../models/Article.js");
var scrape = require("../scrape/scrape");

module.exports = {
  scrapeArticles: function(req, res) {
    // scrape the NYT
    return scrape()
      .then(function(articles) {
        // then insert articles into the db
        return db.Article.create(articles);
      })
      .then(function(dbArticle) {
        if (dbArticle.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbArticle.length + " new articles!"
          });
        }
      })
      .catch(function(err) {
        // This query won't insert articles with duplicate Articles, but it will error after inserting the others
        res.json({
          message: "Scrape complete!!"
        });
      });
  },
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbArticle) {
        res.json(dbArticle);
      });
  },
  // Delete the specified Article
  delete: function(req, res) {
    db.Article.remove({ _id: req.params.id }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  },
  // Update the specified Article
  update: function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  }
};