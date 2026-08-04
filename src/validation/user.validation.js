const joi = require("joi");

class UserSchemaValidation {
  static register = joi.object({
    name: joi
      .string()
      .trim()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        "string.empty": "Name is required",
        "string.pattern.base": "Name should contain only spaces and character",
        "any.required": "Name is required",
      }),
    email: joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter valid email",
      "any.required": "Email is required",
    }),
    password: joi
      .string()
      .trim()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./~`]).{8,}$/,
      )
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password is required",
      }),
  });

  static login = joi.object({
    email: joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter valid email",
      "any.required": "Email is required",
    }),
    password: joi.string().trim().required().messages({
      "string.required": "Password is required",
      "any.required": "Password is required",
    }),
  });
}
module.exports = UserSchemaValidation;
