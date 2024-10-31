import mongoose from "mongoose";
import seedAdminUser from "./seedAdmin";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string


const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    console.log("MongoDB connected successfully");
    await seedAdminUser();
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
