// Mongoose
const mongoose = require("mongoose");

// Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: String
});

// Create model from schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the comment model
module.exports = Comment;