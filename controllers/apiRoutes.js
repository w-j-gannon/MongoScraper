var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    // Get NYT scrape
    app.get("/api/scrape", (req, res) => {
        axios
            .get("https://www.nytimes.com")
            .then(response => {
                let $ = cheerio.load(response.data);
                
                $(".css-1qiat4j").each(function(i, element) {
                    
                    let article = {
                        title: 
                            $(element).children("h2").text(),
                        link: 
                            $(element).children("a").attr("href"),
                        summary: 
                            $(element).children("li").text(),
                        image: 
                            $(element).children("img").attr("src"),

                    };

                db.Article.findOne({ title: article.title }).then(dbArticle => {
                    if (!dbArticle) {
                    db.Article.create(article)
                        .then(dbArticle => {
                        console.log("Creating article");
                        })
                        .catch(err => {
                        console.log(err);
                        });
                    }
                });
            });
            res.json("Scrape complete");
        });
    });

    // Save an article
    app.put("/api/save", (req, res) => {
        db.Article.updateOne(
            { _id: req.body.id },
            { $set: { saved: true, createdAt: new Date() } }
        ).then(record => {
            res.json(record);
        });
    });

    // Remove from saved
    app.put("/api/unsave", (req, res) => {
        db.Article.updateOne(
            { _id: req.body.id }, 
            { $set: { saved: false } })
        .then(response => {
            res.json(response);
        });
    });

    // Get comments
    app.get("/api/comments/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                res.json(err);
        });
    });
    
    // Add a comment
    app.post("/api/newcomment/:id", (req, res) => {
        db.Comment.create(req.body).then(dbComment => {
            return db.Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comment: dbComment._id } },
                { new: true }
            )
            .then(dbArticle => {
                res.json(dbComment);
            });
        });
    });

    // Delete a comment
    app.delete("/api/deletecomment/:id", (req, res) => {
        db.Comment.deleteOne({ _id: req.params.id }).then(result => {
          res.json(result);
        });
    });
};