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
    (await blogRepository.insertBlog(req.body))
      ? res.status(200).json({ message: "Blog created Successfully" })
      : res.status(500).json({ message: "Database Error Occurred" });
  } else {
    res.status(422).json(commonResponse("Validation errors", validationErrors));
  }
});

module.exports = router;
