import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

// connecting to mongoDB database
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};
