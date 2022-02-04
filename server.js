require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./database/connection");

if (DB.connectToDB()) {
  const port = process.env.PORT || 8080;
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "5mb" }));

  require("./routes/routes.js")(app);

  app.listen(port, () => console.log("Server Up on port " + port));
}
