const Blog = require("../database/models/blog.model");
const logger = require("../services/logger.service");

module.exports.insertBlog = async (blog) => {
  try {
    const newBlog = new Blog({
      title: blog.title,
      body: blog.body,
    });
    newBlog.save();
    return true;
  } catch (err) {
    logger.error("Database Insertion failed err: ", err);
    console.log(err);
    return false;
  }
};

module.exports.findAll = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs ? blogs : false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};
