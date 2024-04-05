import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port: number = 5000;

async function main() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL as string
    );

    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (err) {}
}

main();