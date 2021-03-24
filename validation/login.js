const Validator = require("validator");
const isEmpty = require("is-empty");
const _ = require('lodash');

module.exports = (data) => {
  ['email', 'password'].forEach(field => data[field] = data[field] || "");
  
  let errors = {};
  ['email', 'password'].forEach(field => {
    if(Validator.isEmpty(data[field]))
      errors[field] = `${_.startCase(field)} is required`;
  });
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
