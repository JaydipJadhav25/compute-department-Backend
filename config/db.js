import dotenv from "dotenv"
dotenv.config();
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/computer-Department" ||process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;