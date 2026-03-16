import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};
