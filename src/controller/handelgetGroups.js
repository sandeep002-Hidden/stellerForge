import Groups from "../models/Groups.model.js"
export default async function handelGetGroups(req,res){
    const username=req.cookies.loggedInUser
    Groups.find({teamMembers:username}).then((groups)=>{
        res.render("groups",{groupList:groups})
    }).catch((error)=>{
        console.log(error)
    })
}