const joi = require("joi");
class ProductValidation {
  static generateProduct = joi.object({
    productName: joi.string().trim().required().messages({
      "string.empty": "Product Name is required",
      "any.required": "Product Name is required",
    }),
    category: joi.string().trim().required().messages({
      "string.empty": "Product category is required",
      "any.required": "Product category is required",
    }),
    brand: joi.string().trim().required().messages({
      "string.empty": "Product brand is required",
      "any.required": "Product brand is required",
    }),
    targetAudience: joi.string().trim().required().messages({
      "string.empty": "TargetAudience is required",
      "any.required": "TargetAudience is required",
    }),
    keyFeatures: joi
      .array()
      .items(
        joi.string().trim().required().messages({
          "string.empty": "key features is required",
          "any.required": "key features is required",
        }),
      )
      .min(1)
      .required()
      .messages({
        "array.base": "Key features must be an array.",
        "array.min": "Please provide at least one key feature.",
        "any.required": "Key features are required.",
      }),
  });
}
module.exports = ProductValidation;
