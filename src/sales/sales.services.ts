import { startSession } from "mongoose";
import SalesModel from "./sales.model";
import catchAsync from "../utils/catchAsync";
import GadgetModel from "../gadgets/gadget.model";
import AppError from "../errorHandlers/appError";
import { cartModel } from "../cart/cart.model";

export const createSaleService = async (addedBy: string, buyer: any) => {
  const session = await startSession();
  try {
    await session.withTransaction(async () => {
      const cart: any = await cartModel
        .findOne({ addedBy, sold: false })
        .populate("items.gadgetId", "name price");

      if (!cart) {
        throw new Error(`Cart not found for user ${addedBy}`);
      }

      await cartModel.findByIdAndUpdate(cart._id, { sold: true }, { session });

      await SalesModel.create([{ cartId: cart._id, buyer }], { session });

      await Promise.all(
        cart?.items?.map(async (item: any) => {
          const gadget = await GadgetModel.findById(item.gadgetId);

          if (!gadget) {
            throw new Error(`Gadget with ID ${item.gadgetId} not found`);
          }

          gadget.quantity -= item.quantity;

          if (gadget.quantity <= 0) {
            gadget.isDeleted = true;
          }

          await gadget.save({ session });
        })
      );
    });

    await session.commitTransaction();
  } catch (error) {
    console.log(error);

    await session.abortTransaction();
    throw new AppError("MONGO", error);
  } finally {
    await session.endSession();
  }

  return null;
};

export const getSalesService = async (data: string) => {
  let filter: any = {};
  const today = new Date();

  if (data === "1") {
    const timeStart = new Date().setUTCHours(0, 0, 0, 0);

    filter = {
      createdAt: {
        $gte: timeStart,
        $lt: today,
      },
    };
  } else if (data === "2") {
    const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    filter = {
      createdAt: {
        $gte: startOfWeek,
        $lt: today,
      },
    };
  } else if (data === "3") {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    filter = {
      createdAt: {
        $gte: startOfMonth,
        $lt: today,
      },
    };
  } else if (data === "4") {
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    filter = {
      createdAt: {
        $gte: startOfYear,
        $lt: today,
      },
    };
  }

  const sales = await SalesModel.find(filter)
    .select({
      "buyer.name": 1,
      "buyer.phone": 1,
      createdAt: 1,
    })
    .populate({
      path: "cartId",
      model: "Cart",
      select: "items",
    });

  return sales;
};
