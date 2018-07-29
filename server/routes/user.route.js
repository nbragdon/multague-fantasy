const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/login', function (req, res) {
  User.findOne({ username: req.body.username })
    .exec()
    .then(function (user) {
      console.log(req.body);
      console.log(user);
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              email: user.email,
              username: user.username,
              _id: user._id
            },
            'secret',
            {
              expiresIn: '2h'
            }
          );

          return res.status(200).json({
            success: 'Welcome to the JWT Auth',
            token: jwtToken
          });
        }
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
});

module.exports = router;
