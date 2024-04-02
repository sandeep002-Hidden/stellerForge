import Groups from "../models/Groups.model.js";

export default async function handelPostGroup(req,res){
    const {groupName,groupDes}=req.body
    const user=req.cookies.loggedInUser
    console.log(user)
    const data={
        grpName:groupName,
        groupDes:groupDes,
        teamMembers:[user],
        grpCreator:user,
    }
    await Groups.create(data)
    .catch((error)=>{
        console.log("Error while inserting data"+error)
    })
    res.render("Others",{data:"Group created success fully, Go back to Continue"})
}