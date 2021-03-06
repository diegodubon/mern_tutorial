const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExprienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "job school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "field of study date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
