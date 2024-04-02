import mongoose from "mongoose";
const problemsSchema=new mongoose.Schema({
    typeP:{
        type:String,
        required:true,
    },
    problemI:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    solutions:{
        type:Array,
    },
    sPUname:{
        type:Array,
    }
},{timestamps:true})
const Problems=mongoose.model("problems",problemsSchema)
export default Problems;