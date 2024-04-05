import { Schema, Types, model } from "mongoose";
import { TCartItem, TCartModel } from "./cart.interface";

export const cartItemSchema = new Schema<TCartItem>({
  gadgetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Gadget",
  },

  quantity: {
    type: Number,
    required: true,
  },
});

export const cartModelSchema = new Schema<TCartModel>({
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: {
    type: [cartItemSchema],
    required: true,
  },
  sold: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const cartModel = model<TCartModel>("Cart", cartModelSchema);
