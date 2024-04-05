import Joi from "joi";

const buyerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

export const JoiCartItemSchema = Joi.object({
  gadgetId: Joi.string().required(),
  quantity: Joi.number().required(),
});

const JoiCartModelValidationSchema = Joi.object({
  buyer: buyerSchema.required(),
  addedBy: Joi.string().required(),
  sold: Joi.boolean().required(),
  items: Joi.array().items(JoiCartItemSchema).required(),
});

export default JoiCartModelValidationSchema;
