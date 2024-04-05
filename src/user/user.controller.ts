import { NextFunction, Request, Response } from "express";
import { JoiLoginUserSchema, JoiUserSchema } from "./user.validation";
import {
  createUserService,
  loginUserService,
} from "./user.services";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorHandlers/appError";

// creating a user

export const registerUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiUserSchema.validate(req?.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req?.body?.password, salt);
    value.password = passwordHash;

    const result: any = await createUserService(value);

    const data: any = result.toObject();
    delete data?.__v;
    delete data?.password;

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: data,
    });
  }
);

// user logging in controller
export const userLoginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiLoginUserSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const email = value.email;
    const password = value.password;

    const result: any = await loginUserService(email, password);

    const data: any = result?.user?.toObject();
    delete data?.__v;
    delete data?.password;
    delete data?.createdAt;
    delete data?.updatedAt;

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User login successful",
      data: {
        user: data,
        token: result?.token,
      },
    });
  }
);
