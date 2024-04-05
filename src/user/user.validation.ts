import Joi from "joi";

// all validation for user register and login
export const JoiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).options({ abortEarly: false });

export const JoiLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


