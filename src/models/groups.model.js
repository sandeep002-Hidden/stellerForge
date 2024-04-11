import mongoose from "mongoose";
const GroupSchema=new mongoose.Schema({
    grpName:{
        type:String,
        required:true,
        unique:true
    },
    groupDes:{
        type:String,
        required:true,
    },
    teamMembers:{
        type:Array,
        required:true,
    },
    grpCreator:{
        type:String,
        required:true,
    },
    groupCharts:{
        type:Array,
        timestamps:true
    }
},{timestamps:true})
const Groups=mongoose.model("Groups",GroupSchema)
export default Groups;