const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateReviewInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (
    !Validator.isLength(data.text, {
      min: 3,
      max: 300
    })
  ) {
    errors.text = 'Review must have at least 3 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Oops you forgot to say something';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
