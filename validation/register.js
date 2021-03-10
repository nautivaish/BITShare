const Validator = require("validator");
const isEmpty = require("is-empty");
// const inRange = require("in-Range");
module.exports = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.hostelName = !isEmpty(data.hostelName) ? data.hostelName : "";
  data.roomNumber = !isEmpty(data.roomNumber) ? data.roomNumber : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  // data.roomNumber = !inRange(data.phoneNumber>0 && data.phoneNumber<500) ? data.roomNumber : "";
  // data.phoneNumber = !inRange(data.phoneNumber>999999999 && data.phoneNumber<10000000000) ? data.phoneNumber : "";

 
  if(data.roomNumber<1 || data.roomNumber>499){
    errors.roomNumber = "Room number must be between 1 and 499";
  }
  if(data.phoneNumber<=999999999 || data.phoneNumber>=10000000000){
    errors.phoneNumber = "Phone number must be between 10 digited";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.hostelName)) {
    errors.hostelName = "Hostel Name is required";
  }
  if (Validator.isEmpty(data.roomNumber)) {
    errors.roomNumber = "Room Number is required";
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone Number is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  // if(Validato)
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
