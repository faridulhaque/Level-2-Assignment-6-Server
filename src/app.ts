import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { gadgetRoutes } from "./routes/gadget.routes";
import { globalErrorHandler } from "./errorHandlers/gloabalErrorHandler";
import { salesRoutes } from "./routes/sales.routes";
import { cartRoutes } from "./routes/cart.routes";

const app: Application = express();

app.use(express.json());

const corsConfig = {
  // origin: "https://gadget-management-farid.netlify.app",
  origin: true,
  credentials: true,
  methods: ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
  optionsSuccessStatus: 204,
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsConfig));

app.use("/api/auth", authRoutes);
app.use("/api/gadget", gadgetRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/cart", cartRoutes);

app.use(globalErrorHandler);

app.use("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "no route found" });
});

export default app;
