const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function ValidateRegistrationInput(data) {
  let errors = {};
  data.restaurantname = !isEmpty(data.restaurantname)
    ? data.restaurantname
    : '';
  if (Validator.isEmpty(data.restaurantname)) {
    errors.restaurantname = 'Restuarant Name is field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
