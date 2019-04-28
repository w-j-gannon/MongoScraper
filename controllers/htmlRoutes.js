module.exports = function(app) {
 
    // Load landing page
    app.get("/", function(req, res) {
      res.render("index");
    });
  
    app.get("/saved", function(req, res) {
      res.render("saved");
    });
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      res.render("404");
    });
};