import Problems from "../models/problems.model.js";

export default async function handelPostProblems(req,res){
    const {typeP,problemI}=req.body
    const user=req.cookies.loggedInUser
    console.log(req.body)
    console.log(problemI)
    const data={
        typeP:typeP,
        problemI:problemI,
        username:user,
        solutions:[],
        sPUname:[],
    }
    Problems.create(data).catch((error)=>{
        console.log("Error while inserting the Problem"+error)
    })
    res.render("Others",{data:"Your problem published Successfully,Go back To continue"})
}