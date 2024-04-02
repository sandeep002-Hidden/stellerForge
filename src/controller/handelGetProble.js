import Problems from "../models/problems.model.js"
export default async function handelGetProblems(req,res){
    const userName=req.cookies.loggedInUser
    Problems.find({username:userName}).then((problems)=>{
        res.render("problems",{myProblems:problems})
    })
    .catch((err)=>{
        console.log("Error occur During Data base connection"+err)
    })
}