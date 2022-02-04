const blogController = require("../controllers/blog/Blog.controller");

module.exports = function (app) {
  app.use("/api/v1", blogController);
};
