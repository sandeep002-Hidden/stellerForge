import mongoose from "mongoose";
export default function connectDB(){
  return mongoose.connect(process.env.MONGODB_URI)
}