const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateExperienceInput(data) {
  const errors = {};

  data.address1 = !isEmpty(data.address1) ? data.address1 : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.area = !isEmpty(data.area) ? data.area : '';

  if (Validator.isEmpty(data.address1)) {
    errors.address1 = 'The first Line of your address is required';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'Your state of residence is required';
  }

  if (Validator.isEmpty(data.area)) {
    errors.area = 'Your area of residence is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
