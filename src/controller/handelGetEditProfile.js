import User from "../models/user.model.js"
export default async function(req,res){
    const user=req.cookies.loggedInUser
    await User.find({username:user}).then((profileDetail)=>{
        res.render("editProfile",{message:"",profileDetails:profileDetail})
    })
    .catch((error)=>{
        console.log("Error occur while connecting to db"+error)
    })
}