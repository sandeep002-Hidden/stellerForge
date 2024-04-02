import Groups from "../models/Groups.model.js"
export default async function handelGetGroups(req,res){
    const username=req.cookies.loggedInUser
    Groups.find({grpCreator:username}).then((groups)=>{
        res.render("groups",{groupList:groups})
    })
}