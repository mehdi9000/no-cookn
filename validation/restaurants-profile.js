const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateProfileInput(data) {
  let errors = {};

  // data.opensat = !isEmpty(data.opensat) ? data.opensat : '';
  // // data.location = !isEmpty(data.location) ? data.location : '';

  // if (Validator.isEmpty(data.opensat)) {
  //   errors.opensat = 'Opens at is required';
  // }

  // data.closesat = !isEmpty(data.closesat) ? data.closesat : '';

  // if (Validator.isEmpty(data.closesat)) {
  //   errors.closesat = 'Closes at field is required';
  // }

  // if (Validator.isEmpty(data.location)) {
  //   errors.location = 'Location field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
