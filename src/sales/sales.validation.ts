import Joi from "joi";

export const JoiSalesValidationSchema = Joi.object({
    productId: Joi.string().required(),
    buyerName: Joi.string().required(),
    quantityHistory: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required(),
});
