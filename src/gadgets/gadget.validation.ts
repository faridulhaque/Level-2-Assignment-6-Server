import Joi from "joi";
import { TGadget } from "./gadget.interfaces";

export const JoiGadgetValidationSchema = Joi.object<TGadget>({
  name: Joi.string().required(),
  imgUrl: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  releaseYear: Joi.number().optional(),
  brand: Joi.string().allow("").optional(),
  category: Joi.string().allow("").optional(),
  model: Joi.string().allow("").optional(),
  os: Joi.string().allow("").optional(),
  connectivity: Joi.string().allow("").optional(),
  powerSource: Joi.string().allow("").optional(),
  createdBy: Joi.string().required(),
  features: Joi.object({
    camera: Joi.string().allow("").optional(),
    storage: Joi.string().allow("").optional(),
    screenSize: Joi.number().optional(),
  }),
  others: Joi.object({
    weight: Joi.number().optional(),
    dimensions: Joi.string().allow("").optional(),
  }),
});
