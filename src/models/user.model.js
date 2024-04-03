import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        require:true,
    },
    followers:{
        type:Array,
    },
    following:{
        type:Array,
    }
},{timestamps:false})
const User=mongoose.model("test2",userSchema)
export default User;