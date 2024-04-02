import User from "../models/user.model.js";
export default function handelLogin(req, res) {
  const userName=req.body.dUsername
  if(req.cookies.loggedInUser===userName){
    return res.redirect("/user/profile")
}
  User.find({username:userName})
    .then((user) =>{
        console.log(user)
        if(req.body.dPassword===user[0].password){
            const maxAge = 30 * 24 * 60 * 60 * 1000;
            res.cookie('loggedInUser', userName, { maxAge, httpOnly: true });
            res.redirect("/user/profile")
        }
    })
    .catch((err) => console.error("Error fetching users:", err));
}