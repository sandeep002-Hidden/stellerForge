import User from "../models/user.model.js";
export default async function addFriends(req, res) {
  const userSearching = req.cookies.loggedInUser;
  const temp = req.body.followers;
  User.updateOne({ username: userSearching }, { $push: { following: temp } }).catch((error)=>{
    console.log("Error occur during adding following")
  })
  User.updateOne({ username: temp }, { $push: { followers: userSearching } }).catch((error)=>{
    console.log("Error occur during adding followers")
  })
}
