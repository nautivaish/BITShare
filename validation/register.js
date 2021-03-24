const Validator = require('validator');
const isEmpty = require('is-empty');
const _ = require('lodash');

module.exports = (data) => {
  const fields = ['name', 'email', 'hostelName', 'roomNumber', 'phoneNumber', 'password', 'password2'];
  fields.forEach(field => data[field] = data[field] || "");
 
  let errors = {};
  fields.forEach(field => {
    if(Validator.isEmpty(data[field]))
      errors[field] = `${_.startCase(field)} is required`;
  });
  if (data.roomNumber < 1 || data.roomNumber > 499){
    errors.roomNumber = "Room number must be between 1 and 499";
  }
  if (data.phoneNumber <= 999999999 || data.phoneNumber >= 10000000000){
    errors.phoneNumber = "Phone number must be 10 digits";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isLength(data.password, { min: 6})) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.isLength(data.password, { max: 30})) {
    errors.password = "Password must be at most 30 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
