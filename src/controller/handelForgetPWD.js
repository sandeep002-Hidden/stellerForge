import User from "../models/user.model.js";
import nodemailer from "nodemailer";
export default async function (req, res) {
  const pUserName = req.body.upN;
  const dUsername = await User.distinct("username");
  if (!dUsername.includes(pUserName)) {
    return res.render("forgetPwd", { message: "Username does Not Exist" });
  }
  await User.find({ username: pUserName }).then((detail) => {
    const userPassword = detail[0].password;
    const userEmail = detail[0].email;
    const myMail = "minorpro76@gmail.com";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: myMail,
        pass: "juzp xrgd ikwm kgpx",
      },
    });
    const sendEmail = (email, userPassword, token) => {
      const mailOptions = {
        from: myMail,
        to: email,
        subject: "Password from Stellar Forge",
        text: `your password is ${userPassword}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error in sending email  " + error);
          return true;
        } else {
          console.log("Email sent: ");
          return false;
        }
      });
    };
    sendEmail(userEmail, userPassword);
  });
  return res.render("forgetPwd", { message: "Your Password is Send to Your Mail check and Go for login" });
}
