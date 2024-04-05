import {
  deleteGadgetService,
  deleteMultipleGadgetService,
  getAllGadgetsService,
  getGadgetByFilterService,
  getGadgetFilteredValues,
  getOneGadgetsService,
  updateGadgetService,
} from "./gadget.services";

import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { JoiGadgetValidationSchema } from "./gadget.validation";
import AppError from "../errorHandlers/appError";
import { createGadgetService } from "./gadget.services";
import { verifyJwt } from "../middleWares/verifyJwt";
import { UserModel } from "../user/user.model";

export const createGadgetController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const { value, error } = JoiGadgetValidationSchema.validate(req?.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const result = await createGadgetService(value);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Gadget created successfully",
      data: result,
    });
  }
);

export const updateGadgetController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const { value, error } = JoiGadgetValidationSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }
    const result = updateGadgetService(req.params.id, value);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadget updated successfully",
      data: result,
    });
  }
);

export const deleteGadgetController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const result = await deleteGadgetService(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadget deleted successfully",
      data: result,
    });
  }
);

export const deleteAllGadgetController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const result = await deleteMultipleGadgetService(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadgets deleted successfully",
      data: result,
    });
  }
);

export const filterGadgetController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getGadgetByFilterService(req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadgets filtered successfully",
      data: result,
    });
  }
);

export const getAllGadgets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllGadgetsService();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadgets retrieved successfully",
      data: result,
    });
  }
);

export const getOneGadget = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await getOneGadgetsService(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadget retrieved successfully",
      data: result,
    });
  }
);

export const getGadgetFilterValuesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await getGadgetFilteredValues();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Gadget retrieved successfully",
      data: result,
    });
  }
);
