import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { verifyJwt } from "../middleWares/verifyJwt";
import { createSaleService, getSalesService } from "./sales.services";

export const createSalesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);

    const addedBy = req.params.addedBy as string;
    const buyer = req.body as any
    const result = await createSaleService(addedBy, buyer);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Sales added successfully",
      data: result,
    });
  }
);

export const getSalesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const result = await getSalesService(req.params.param);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Sales added successfully",
      data: result,
    });
  }
);
