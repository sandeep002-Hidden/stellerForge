import express from "express";


import handelLogin from "../controller/login.js";
import handelSignup from "../controller/signup.js";
import sendEmail from "../controller/sendMail.js";
import verifyMail from "../controller/verifyMail.js";
import handelSeeSolutions from "../controller/handelseeSolutions.js";
import handelForgetPWD from "../controller/handelForgetPWD.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router
  .route("/login")
  .get((req, res) => {
    if (req.get("referer") === "http://localhost:4000/signup/enterOTP") {
      res.render("login", {
        message: "Account created success fully Login to continue",
      });
    }

    res.render("login", { message: "" });
  })
  .post(handelLogin);

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup", { message: "" });
  })
  .post(handelSignup);
router.route("/signup/enterOTP").get(sendEmail).post(verifyMail);

router
.route("/problems/seeSolution")
.get(handelSeeSolutions)

router
.route("/forgetPwd")
.get((req,res)=>{
  res.render("forgetPwd",{message:""})
})
.post(handelForgetPWD)
export default router;
