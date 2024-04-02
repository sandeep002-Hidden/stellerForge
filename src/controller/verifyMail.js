import User from "../models/user.model.js";

export default async function verifyMail(req, res) {
  console.log(req.cookies.otp);
  if (!req.cookies.otp) {
    return res.render("Otp", { message: "Time Out Expire please try again" });
  } else if (req.cookies.otp != req.body.otp) {
    return res.render("Otp", { message: "Wrong OTP" });
  } else if (req.cookies.otp === req.body.otp) {
    const username = req.cookies.username;
    const fName = req.cookies.fName;
    const email = req.cookies.userMail;
    const password = req.cookies.password;
    const role = req.cookies.role;
    const followers = [""];
    const following = [""];
    const dataToInsert = {
      username,
      fName,
      email,
      password,
      role,
      followers,
      following,
    };

    try {
        await User.create(dataToInsert);
      res.clearCookie("fName");
      res.clearCookie("otp");
      res.clearCookie("password");
      res.clearCookie("userMail");
      res.clearCookie("role");
      res.clearCookie("username");
      return res.redirect("/login");
    } catch (error) {
      console.error("Error while inserting data:", error);
      return res.render("Otp", { message: "Error while inserting data" });
    }
  }
}
