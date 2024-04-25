import User from "../models/user.model.js";
export default function handelLogin(req, res) {
  const userName = req.body.dUsername;
  User.find({ username: userName })
    .then((user) => {
      if(user[0]!=null){
      if (req.body.dPassword === user[0].password) {
        const maxAge = 30 * 60 * 1000;
        res.cookie("loggedInUser", userName, { maxAge, httpOnly: true });
        res.redirect("/user/profile");
      }
      else{
        res.render("login",{message:"Wrong Password"});
      }
    }
    else{
      res.render("login",{message:"User Does not exist"});
    }
  })

 
    .catch((err) => console.error("Error fetching users:", err));

}