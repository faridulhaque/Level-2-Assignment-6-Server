import { Router } from "express";
import {
  addToCartController,
  getCartController,
  isAddedController,
  manageQuantityController,
  removeCartController,
} from "../cart/cart.controller";

export const cartRoutes = Router();

cartRoutes.get("/is-added", isAddedController);
cartRoutes.get("/:id", getCartController);
cartRoutes.post("/create", addToCartController);
cartRoutes.put("/manage-quantity", manageQuantityController);
cartRoutes.put("/remove/:id", removeCartController);
