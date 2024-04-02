import Problems from "../models/problems.model.js"
export default async function handelSeeSolutions(req,res){
   await Problems.find().then((problemDetails)=>{
        res.render("seeSolutions",{problemDetails:problemDetails})
    })
}