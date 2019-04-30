// Mongoose
const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  saved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// create model from schema
let Article = mongoose.model("Article", ArticleSchema);

// export article model
module.exports = Article;