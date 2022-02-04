const Blog = require("../database/models/blog.model");
const logger = require("../services/logger.service");

module.exports.insertBlog = async (blog) => {
  try {
    const newBlog = new Blog({
      title: blog.title,
      body: blog.body,
    });
    newBlog.save();
    return newBlog;
  } catch (err) {
    logger.error("Database Insertion failed err: ", err);
    console.log(err);
    return false;
  }
};

module.exports.findAll = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs ?? false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.FindByID = async (blogId) => {
  try {
    const blogRetrieved = await Blog.findOne({ _id: blogId }, { _id: 1, name: 1, email: 1 });
    return blogRetrieved ?? false;
  } catch (err) {
    logger.error("Database Selection failed err: ", err);
    return false;
  }
};

module.exports.updateBlog = async (blog, blogId) => {
  try {
    await Blog.updateOne({ _id: blogId }, { title: blog.title, body: blog.body });
    return true;
  } catch (err) {
    logger.error("Database Update failed err: ", err);
    return false;
  }
};

module.exports.deleteBlog = async (blogId) => {
  try {
    await Blog.deleteOne({ _id: blogId });
    return true;
  } catch (err) {
    logger.error("Database Deletion failed err: ", err);
    return false;
  }
};
