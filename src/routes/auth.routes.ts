import { Router } from "express";
import { registerUserController, userLoginController } from "../user/user.controller";

export const authRoutes = Router()

authRoutes.post("/register", registerUserController)
authRoutes.post("/login", userLoginController)