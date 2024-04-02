import Groups from "../models/groups.model.js";
import projects from "../models/projects.model.js";
import User from "../models/user.model.js";
export default function userProfile(req, res) {
  const loggedUserName = req.cookies.loggedInUser;
  User.find({ username: loggedUserName }).then((user) => {
    projects.find({username:loggedUserName}).then((project=>{
        res.render("profile", { userDetails: user ,items:project});
    }))
  });
}
