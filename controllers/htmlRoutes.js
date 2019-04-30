module.exports = function(app) {
 
    // Load landing page
    app.get("/", function(req, res) {
      res.render("index");
    });
    
    //Display articles on load
    app.get("/articles", (req, res) => {
        db.Article.find({ saved: false })
        .sort({ createdAt: -1 })
        .then(dbArticles => {
            res.json(dbArticles);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    // saved page
    app.get("/saved", function(req, res) {
      res.render("saved");
    });
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      res.render("404");
    });
};