const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");

const SECRET = process.env.SECRET;
// Load User model
const User = require("../../models/User");
//@route    GET api/users/test
//@desc     Test users route
//@access   Public
router.get("/test", (req, res) =>
  res.json({
    message: "users works"
  })
);

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
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
  const email = req.body.email;
  const password = req.body.password;

  //Find User by Email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404
      });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Token
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
          res.json({
            message: "Succes",
            success: true,
            token: `Bearer ${token}`,
            code: 200
          });
        });
      } else {
        res.status(400).json({ message: "Password incorrect", code: 400 });
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
