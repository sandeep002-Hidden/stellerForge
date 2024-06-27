import User from "../models/user.model.js";
export default async function handelSignup(req,res){
    const distinctUsername=await User.distinct("username")
    const distinctEmail=await User.distinct("email")
    const { username, fName, email, password, role } = req.body;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_@-]{4,15}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!usernameRegex.test(username)) {
        res.render("signup", { message: "Give a valid Username" });
    }
    else if (distinctUsername.includes(username)) {
        res.render("signup", { message: "Username Already Exists" });
      }
    else if (distinctEmail.includes(email)) {
        res.render("signup", { message: "Email Already Exists ,Go to forget Password to continue" });
      }
    else if(!passwordRegex.test(password)){
        res.render("signup", { message: "Give a strong password" });   
    }
    else{
        res.cookie('username', username, { maxAge: 900000, httpOnly: true });
        res.cookie('fName', fName, { maxAge: 900000, httpOnly: true });
        res.cookie('userMail', email, { maxAge: 900000, httpOnly: true });
        res.cookie('password', password, { maxAge: 900000, httpOnly: true });
        res.cookie('role', role, { maxAge: 900000, httpOnly: true });
        res.redirect(
            `/signup/enterOTP`
          );

    }
}