const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid userId format");
  }
  return value;
}, "ObjectId validation");

const createOtpSchema = Joi.object({
  userId: objectId.required(),
  otp: Joi.number().integer().min(100000).max(999999).required(),
  verified: Joi.boolean().optional(), 
});

module.exports = {
  createOtpSchema,
};
