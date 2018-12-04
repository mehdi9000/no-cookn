const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateProfileInput(data) {
  let errors = {};

  data.phone = !isEmpty(data.phone) ? data.phone : '';
  // data.location = !isEmpty(data.location) ? data.location : '';

  // if (Validator.isEmpty(data.phone)) {
  //   errors.phone = 'Phone is required';
  // }

  // if (
  //   !Validator.isLength(data.phone, {
  //     min: 11,
  //     max: 14
  //   })
  // ) {
  //   errors.phone = 'Phone number must be between 11 and 13 characters';
  // }

  // if (Validator.isEmpty(data.location)) {
  //   errors.location = 'Location field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
