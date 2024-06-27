import projects from "../models/projects.model.js";
import User from "../models/user.model.js";

export default async function handelFindUser(req,res){
  console.log(req.body)
    const findUser=req.body.findUser
    const actualUser=req.cookies.loggedInUser
    if(findUser===actualUser){
        return res.render("Others",{data:"Why you are finding Your-self"})
    }
    const distinctUsername=await User.distinct("username")
    if (!distinctUsername.includes(findUser)) {
        res.render("Others", { data: "Username Does Not exist, Go back To continue" });
      }
      User.find({ username: findUser }).then((user) => {
        projects.find({username:findUser}).then((project=>{
            res.render("findUser", { profileDetail: user ,userProDetails:project});
        }))
      });
}