import { Schema, model } from "mongoose";
import { TSales } from "./sales.interfaces";
import { TCartBuyer } from "../cart/cart.interface";

export const buyerSchema = new Schema<TCartBuyer>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const salesSchema = new Schema<TSales>(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    buyer: {
      type: buyerSchema,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const SalesModel = model<TSales>("Sales", salesSchema);

export default SalesModel;
