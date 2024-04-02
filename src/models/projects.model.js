import mongoose from "mongoose";
const projectSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    projectName:{
        type:String,
        required:true,
    },
    projectDetails:{
        type:String,
        required:true,
        unique:true,
    },
    AimP:{
        type:String,
        required:true,
    },
    files:{
        type:Array,
        required:true,
    },
    Codes:{
        type:Array,
        required:true,
    },
},{timestamps:true})
const projects=mongoose.model("projects",projectSchema)
export default projects;