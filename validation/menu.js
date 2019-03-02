const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateMenuInput(data) {
  const errors = {};

  data.category = !isEmpty(data.category) ? data.category : '';
  data.menuname = !isEmpty(data.menuname) ? data.menuname : '';
  data.deliverytime = !isEmpty(data.deliverytime) ? data.deliverytime : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.category)) {
    errors.category = 'A category is rquired for the menu item';
  }

  if (Validator.isEmpty(data.menuname)) {
    errors.menuname = 'A name is required for the menu item';
  }

  // if (Validator.isEmpty(data.description)) {
  //   errors.description = 'A description is required for the menu';
  // }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'A price is required for the menu item';
  }

  if (Validator.isEmpty(data.deliverytime)) {
    errors.deliverytime =
      'An estimated delivery time is required for the menu item';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
