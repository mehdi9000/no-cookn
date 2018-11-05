const express = require('express');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
const passport = require('passport');
const router = express.Router();

const Category = require('../../../models/Category');
const validateCategoryInput = require('../../../validation/category');

// @route Get api/posts/test @desc Tests categories route @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users Works'
  })
);

router.post(
  '/',
  passport.authenticate('jwt', { session: 'false' }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Category.findOne({ category: req.body.name })
      .then(category => {
        if (category) {
          errors.name = 'This category name already exists';
          return res.status(403).json(errors);
        } else {
          let newCategory = new Category({
            name: req.body.name
          });
          newCategory.save();
          return res.status(201).json(category);
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
