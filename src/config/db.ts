import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connectionString = `${process.env.MONGODB_URI}`;
        console.log(`Attempting to connect to: ${connectionString}`);
        const connectionInstance = await mongoose.connect(connectionString);
        console.log(`Database connected successfully with host ${connectionInstance.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Database connection failed:", error.message);
        } else {
            console.error("Database connection failed:", error);
        }
        process.exit(1);
    }
};

export default connectDB;
