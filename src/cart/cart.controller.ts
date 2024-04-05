import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorHandlers/appError";
import {
  addToCart,
  getCart,
  isAddedService,
  manageQuantity,
  removeCart,
} from "./cart.service";
import { verifyJwt } from "../middleWares/verifyJwt";
import { TActionForCart } from "./cart.interface";
import { JoiCartItemSchema } from "./cart.validation";

export const addToCartController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const addedBy = req.body.addedBy as any;
    const cartItem = req.body.cartItem as any;

    const { value, error } = JoiCartItemSchema.validate(cartItem);

    if (error) {
      throw new AppError("JOI", error);
    }

    const result = await addToCart(value, addedBy);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Cart updated successfully",
      data: result,
    });
  }
);

export const getCartController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const id = req.params.id as string;

    const result = await getCart(id);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Cart retrieved successfully",
      data: result?.length ? result : null,
    });
  }
);

export const removeCartController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    await removeCart(req.params.id as string);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Cart removed successfully",
      data: null,
    });
  }
);
export const isAddedController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const data: any = {
      gadgetId: req.query.gadgetId as any,
      addedBy: req.query.addedBy as any,
    };

    const result = await isAddedService(data);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "item already added",
      data: result,
    });
  }
);

export const manageQuantityController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const data = {
      action: req.body.action as TActionForCart,
      itemId: req.body.itemId as any,
      addedBy: req.body.addedBy as any,
      currentQuantity: req.body.currentQuantity as number,
    };

    const result = await manageQuantity(data);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Quantity updated",
      data: result,
    });
  }
);
