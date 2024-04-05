import { Schema, model } from "mongoose";
import { TUser } from "./user.interfaces";
import AppError from "../errorHandlers/appError";

export const MUserSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

MUserSchema.pre("save", async function (next) {
  const nonUniqueEmail = await UserModel.findOne({
    email: this.email,
  });

  if (nonUniqueEmail) {
    throw new AppError("preCheck", { message: "Email already in use" });
  }
  next();
});

export const UserModel = model<TUser>("User", MUserSchema);
