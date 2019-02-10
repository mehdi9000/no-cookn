const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidateProfileInput(data) {
  let errors = {};

  data.opensat = !isEmpty(data.opensat) ? data.opensat : '';
  data.closesat = !isEmpty(data.closesat) ? data.closesat : '';
  // data.deliveryareas = !isEmpty(data.deliveryareas) ? data.deliveryareas : '';
  // data.cuisines = !isEmpty(data.cuisines) ? data.cuisines : '';
  data.minimumorder = !isEmpty(data.minimumorder) ? data.minimumorder : '';
  // data.categories = !isEmpty(data.categories) ? data.categories : '';
  data.deliverytime = !isEmpty(data.deliverytime) ? data.deliverytime : '';
  data.paymentsaccepted = !isEmpty(data.paymentsaccepted)
    ? data.paymentsaccepted
    : '';
  data.website = !isEmpty(data.website) ? data.website : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (Validator.isEmpty(data.opensat)) {
    errors.opensat = 'Opens At field is required';
  }

  data.closesat = !isEmpty(data.closesat) ? data.closesat : '';

  if (Validator.isEmpty(data.closesat)) {
    errors.closesat = 'Closes At field is required';
  }
  // if (Validator.isEmpty(data.deliveryareas)) {
  //   errors.deliveryareas = 'Delivery Areas field is required';
  // }

  // if (Validator.isEmpty(data.cuisines)) {
  //   errors.cuisines = 'Cuisines field is required';
  // }

  if (Validator.isEmpty(data.minimumorder)) {
    errors.minimumorder = 'Minimum Order field is required';
  }

  // if (Validator.isEmpty(data.categories)) {
  //   errors.categories = 'Categories field is required';
  // }

  if (Validator.isEmpty(data.deliverytime)) {
    errors.deliverytime = 'Delivery Time field is required';
  }

  if (Validator.isEmpty(data.paymentsaccepted)) {
    errors.paymentsaccepted = 'Accepted Payments Type field is required';
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = 'Website Field field is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Please enter a valid website URL';
    }
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone Number field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
