import bcrypt from "bcrypt";
import { TUser } from "./user.interfaces";
import { UserModel } from "./user.model";
import jwt from "jsonwebtoken";
import AppError from "../errorHandlers/appError";

// service function for create user

export const createUserService = async (data: TUser) => {
  const user: any = await UserModel.create(data);

  return user;
};

// service function for logging In

export const loginUserService = async (email: string, password: string) => {
  const user: any = await UserModel.findOne({ email });
  if (user === null) {
    throw new AppError("auth", {
      message: `There is no user with this username`,
    });
  }

  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new AppError("auth", {
      message: `Password did not match`,
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      email: user.email,
      iat: Math.floor(Date.now()),
      exp: Math.floor(Date.now()),
    },
    process.env.JWT_SECRET as string
  );

  return {
    user,
    token,
  };
};



