const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    publishedAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
  },
  { versionKey: false }
);

const Blog = mongoose.model("Blogs", schema);

module.exports = Blog;
