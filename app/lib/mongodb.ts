import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return mongoose.connection;
    }

    if (mongoose.connection.readyState === 0) {
      // Not connected, establish connection
      await mongoose.connect(MONGODB_URI);
    }

    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;

const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    // Start your server or other logic here
  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();