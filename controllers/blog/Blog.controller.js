const router = require("express").Router();
const blogRepository = require("../../repositories/blog.repository");
const commonResponse = require("../../services/response.service");
const blogVlidator = require("./blog.validators");

router.get("/blogs", async (req, res) => {
  const blogs = await blogRepository.findAll();
  res.status(200).json(commonResponse("All blogs", blogs));
});

router.post("/blog", async (req, res) => {
  const validationErrors = blogVlidator(req.body);
  if (Object.keys(validationErrors).length === 0) {
    const newBlog = await blogRepository.insertBlog(req.body);
    newBlog
      ? res.status(201).json(commonResponse("Blog created successfully", newBlog))
      : res.status(500).json(commonResponse("internal server error", null));
  } else {
    res.status(422).json(commonResponse("Validation errors", validationErrors));
  }
});

router.put("/blog/:blogId", async (req, res) => {
  const validationErrors = blogVlidator(req.body);
  if (Object.keys(validationErrors).length === 0) {
    if (await blogRepository.FindByID(req.params?.blogId)) {
      (await blogRepository.updateBlog(req.body, req.params?.blogId))
        ? res.status(200).json({ message: "Blog updated Successfully" })
        : res.status(500).json({ message: "Database Error Occurred" });
    } else {
      res.status(422).json(commonResponse("Validation errors", { blogId: "id is not found" }));
    }
  } else {
    res.status(422).json(commonResponse("Validation errors", validationErrors));
  }
});

router.delete("/blog/:blogId", async (req, res) => {
  if (req.params?.blogId?.length > 0) {
    if (await blogRepository.FindByID(req.params?.blogId)) {
      (await blogRepository.deleteBlog(req.params.blogId))
        ? res.status(202).json({ message: "Blog deleted Successfully" })
        : res.status(500).json({ message: "Database Error Occurred" });
    } else {
      res.status(422).json(commonResponse("Validation errors", { blogId: "id is not found" }));
    }
  } else {
    res.status(404);
  }
});

router.put("/blog", async (req, res) => {});

module.exports = router;
