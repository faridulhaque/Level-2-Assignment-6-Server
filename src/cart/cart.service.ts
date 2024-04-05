import { startSession } from "mongoose";
import { TCartItem, TCartModel } from "./cart.interface";
import { cartModel } from "./cart.model";

export const addToCart = async (data: TCartItem, addedBy: string) => {
  let cart = await cartModel.findOne({ addedBy: addedBy, sold: false });

  if (cart) {
    cart.items.push(data);
    return await cart.save();
  }
  return await cartModel.create({ items: [data], addedBy });
};

export const isAddedService = async (data: any) => {
  const result = await cartModel.findOne({
    "items.gadgetId": data?.gadgetId,
    addedBy: data?.addedBy,
    sold: false,
    isDeleted: false,
  });
  return !!result;
};

export const getCart = async (id: string) => {
  const cart: any = await cartModel
    .findOne({ addedBy: id, sold: false, isDeleted: false })
    .populate("items.gadgetId", "name price quantity");

  return cart?.items;
};

export const manageQuantity = async (data: any) => {
  let updatedItem;
  const filter = {
    addedBy: data?.addedBy,
    items: {
      $elemMatch: { _id: data?.itemId },
    },
  };

  if (data?.action === "INCREMENT") {
    updatedItem = await cartModel.findOneAndUpdate(
      filter,
      { $inc: { "items.$.quantity": 1 } },
      { new: true }
    );
  } else if (data?.action === "DECREMENT" && data?.currentQuantity > 1) {
    updatedItem = await cartModel.findOneAndUpdate(
      filter,
      { $inc: { "items.$.quantity": -1 } },
      { new: true }
    );
  } else {
    return null;
  }

  return updatedItem;
};

export const removeCart = async (addedBy: string) => {
  return await cartModel.findOneAndUpdate(
    { isDeleted: false, addedBy, sold: false },
    { isDeleted: true }
  );
};
