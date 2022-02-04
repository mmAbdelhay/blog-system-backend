const blogVlidator = (req) => {
  const returnValue = {};
  if (!req.title || req.title.length == 0) returnValue.title = "Title is required";
  if (!req.body || req.body.length == 0) returnValue.body = "Body is required";
  if (req.body?.length > 1000) returnValue.body = "Body should not exceed 1000 characters";
  return returnValue;
};

module.exports = blogVlidator;
