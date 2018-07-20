const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const passport = require("passport");
const bodyParser = require("body-parser");
var morgan = require("morgan");
// routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();
// DB config
// console.log("MONGO_URI", process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;

const logger = require("./logger");
// Connect to mongodb
mongoose
  .connect(MONGO_URI)
  .then(db => logger.info("MongoDB Connected"))
  .catch(err => logger.error(err));

// passport middlewate
app.use(passport.initialize());
// passport config
require("./config/passport")(passport);

// Logger morgan
app.use(morgan("dev"));
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server running on port ${port}`));
