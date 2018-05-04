const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();
//DB config
// console.log("MONGO_URI", process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;

//Connect to mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
