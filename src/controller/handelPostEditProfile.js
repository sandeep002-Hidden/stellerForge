import User from "../models/user.model.js";
import projects from "../models/projects.model.js";

export default async function (req, res) {
  const user = req.cookies.loggedInUser;
  const { newPassword, newRole, removeFollowing, dProject } = req.body;
  console.log(newPassword, newRole, removeFollowing, dProject ,user)
  try {
    await User.updateMany(
      { username: user },
      { $set: { password: newPassword, role: newRole }, $pull: { following: removeFollowing } }
    );

    await User.updateOne(
      { username: removeFollowing },
      { $pull: { followers: user } }
    );

    await projects.deleteOne({ username: user, projectName: dProject });

    await User.find({username:user}).then((profileDetail)=>{
        res.render("editProfile",{message:"Profile Updated Success Fully",profileDetails:profileDetail})
    })
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
}
