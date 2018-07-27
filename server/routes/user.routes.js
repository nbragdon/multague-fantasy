const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');

router.post('/signup', function (req, res) {
  bcrypt.hash(req.body.password, 10, (hashError, hash) => {
    if (hashError) {
      res.status(500).json({
        error: hashError
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: hash
      });
      user.save().then(function (result) {
        console.log(result);
        res.status(200).json({
          success: 'New user has been created'
        });
      }).catch((userSaveError) => {
        res.status(500).json({
          error: userSaveError
        });
      });
    }
  });
});

module.exports = router;
