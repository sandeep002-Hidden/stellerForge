import express from "express";

import userProfile from "../controller/userProfile.js";
import findUserHandeller from "../controller/handelGetFindUser.js";
import handelGetGroups from "../controller/handelGetGroups.js";
import handelGetProblems from "../controller/handelGetProblem.js";
import handelPostGroup from "../controller/handelPostGroups.js";
import handelPostProblems from "../controller/handelPostProblems.js";
import handelGetGiveSolution from "../controller/handelGetGiveSolution.js";
import handelPostGiveSolution from "../controller/handelPostGiveSolution.js";
const router2 = express.Router();

router2.get("/", (req, res) => {
  res.redirect("/user/profile");
});

router2
.route("/profile")
.get(userProfile);

router2
.route("/Groups")
.get(handelGetGroups)
.post(handelPostGroup);

router2
.route("/problems")
.get(handelGetProblems)
.post(handelPostProblems);

router2
.route("/FindProjects")
.get((req, res) => {
  res.render("projects", { foundProjects: [""] });
});

router2
.route("/findUser")
.post(findUserHandeller);

router2
.route("/EditProfile")
.get((req, res) => {
  res.send("Edit profile");
});

router2
.route("/problems/giveSol")
.get(handelGetGiveSolution)
.post(handelPostGiveSolution);

export default router2;
