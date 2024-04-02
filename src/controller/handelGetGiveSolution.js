import Problems from "../models/problems.model.js";
export default async function(req,res){
    Problems.find().then((problems)=>{
        res.render("giveSolution",{problems:problems})
    })
}