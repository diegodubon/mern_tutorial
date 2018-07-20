const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Proifle')
const User = require('../../models/User')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}
    let userId = req.user.id
    Profile.findOne({ user: userId })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => {
        res.json(err)
      })
  }
)

module.exports = router
