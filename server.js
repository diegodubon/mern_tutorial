const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const passport = require("passport");
const bodyParser = require("body-parser");

const path = require("path");
var morgan = require("morgan");
// routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

const MONGO_URI = process.env.MONGO_URI;

const logger = require("./logger");
// Connect to mongodb
mongoose
	.connect(
		MONGO_URI,
		{ useNewUrlParser: true }
	)
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

if (process.env.NODE_ENV == 'production') {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server running on port ${port}`));
