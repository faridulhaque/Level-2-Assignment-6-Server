import { Types } from "mongoose";
import { TCartBuyer } from "../cart/cart.interface";

export type TSales = {
  cartId: Types.ObjectId;
  buyer: TCartBuyer;
};
