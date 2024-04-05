import { Types } from "mongoose";

export type TCartModel = {
  buyer?: TCartBuyer;
  addedBy: Types.ObjectId
  items: [TCartItem],
  sold?: boolean,
  isDeleted?: boolean,

}

export type TCartBuyer = {
  name: string;
  phone: string;
  address: string;
}

export type TCartItem = {
  gadgetId: Types.ObjectId,
  quantity: number,
}

export type TActionForCart = "INCREMENT" | "DECREMENT"
