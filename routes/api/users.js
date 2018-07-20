const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logger = require("../..//logger");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const passport = require("passport");

const SECRET = process.env.SECRET;
// Load User model
const User = require("../../models/User");

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  logger.info("/login", "route inicialized");
  logger.info("errors", errors);
  logger.info("isValid", isValid);
  if (!isValid) {
    errors.email = "User not found";
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  logger.info("email", email);
  logger.info("password", password);

  // Find User by Email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign Token
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
          res.json({
            message: "Succes",
            success: true,
            token: `Bearer ${token}`,
            code: 200
          });
        });
      } else {
        errors.password = "Password Incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      message: "Success",
      code: 200,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  }
);

module.exports = router;
