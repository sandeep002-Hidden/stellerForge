import mongoose from "mongoose";
export default function connectDB(){
  return mongoose.connect("mongodb+srv://Sandeepmohapatra:Rahul002@cluster0.pnrf3r0.mongodb.net/TEst_Db")
}