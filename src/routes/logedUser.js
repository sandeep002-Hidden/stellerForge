import express from "express";
import userProfile from "../controller/userProfile.js";
import findUserHandeller from "../controller/findUser.js";
import handelGetGroups from "../controller/handelgetGroups.js";
import handelGetProblems from "../controller/handelGetProble.js";

const router2 = express.Router();

router2.get("/", (req, res) => {
  res.redirect("/user/profile");
});
router2.route("/profile").get(userProfile)

router2.route("/Groups").get(handelGetGroups)
router2.route("/problems").get(handelGetProblems);
router2.route("/FindProjects").get((req, res) => {
  res.render("projects");
});
router2.route("/findUser").post(findUserHandeller);
router2.route("/EditProfile").get((req, res) => {
  res.send("Edit profile");
});

export default router2;
