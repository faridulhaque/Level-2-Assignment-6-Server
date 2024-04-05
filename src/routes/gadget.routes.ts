import { Router } from "express";
import {
  createGadgetController,
  deleteAllGadgetController,
  deleteGadgetController,
  filterGadgetController,
  getAllGadgets,
  getGadgetFilterValuesController,
  getOneGadget,
  updateGadgetController,
} from "../gadgets/gadget.controller";

export const gadgetRoutes = Router();

gadgetRoutes.post("/create", createGadgetController);
gadgetRoutes.get("/all", getAllGadgets);
gadgetRoutes.get("/filter-values", getGadgetFilterValuesController);
gadgetRoutes.get("/filter", filterGadgetController);
gadgetRoutes.get("/:id", getOneGadget);
gadgetRoutes.put("/update/:id", updateGadgetController);
gadgetRoutes.put("/delete/:id", deleteGadgetController);
gadgetRoutes.put("/delete-many", deleteAllGadgetController);
