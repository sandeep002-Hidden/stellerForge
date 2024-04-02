import { fileURLToPath } from "url";
import express, { urlencoded } from "express";
import connectDB from "./db.js";
import nodemailer from "nodemailer";
import path from "path";
import bodyParser from "body-parser";
import { error, profile, warn } from "console";
import fs from "fs";
import multer from "multer";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parentDir = path.dirname(__dirname);
app.use(express.static("public"));
app.set("views", path.join(parentDir, "public", "ejs"));
app.set("view engine", "ejs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(async (req, res, next) => {
  try {
    req.db = await connectDB();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});
const max = 999999;
const min = 100000;
const otp = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(otp);
const myMail = "minorpro76@gmail.com";
const myPassword = "minor@Project2";

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login", { message: "" });
});
app.post("/login", async (req, res) => {
  try {
    const { dUsername, dPassword } = req.body;
    const collection = req.db.collection("test2");
    const user = await collection.find({ username: dUsername }).toArray();
    if (user[0].username === dUsername && user[0].password === dPassword) {
      res.redirect(`/user/profile/:${dUsername}`);
    } else if (
      user[0].username === dUsername &&
      user[0].password != dPassword
    ) {
      res.status(302).render("login", { message: "Wrong password" });
    } else {
      res.status(302).render("login", { message: "Wrong Username" });
    }
  } catch {
    res.status(302).render("login", { message: "Username Does not Exits" });
  }
});
app.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});
app.post("/signup", async (req, res) => {
  const { username, fName, email, password, role } = req.body;
  const collection = req.db.collection("test2");
  const dName = await collection.distinct("username");
  const dEmail = await collection.distinct("email");
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_@-]{4,15}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (dName.includes(username)) {
    res.render("signup", { message: "Username Already Exists" });
  } else if (!usernameRegex.test(username)) {
    res.render("signup", { message: "Give a Strong Username" });
  } else if (dEmail.includes(email)) {
    res.render("signup", {
      message:
        "Mail linked with other account go again to login page to continue",
    });
  } else if (!passwordRegex.test(password)) {
    res.render("signup", { message: "Give a strong password" });
  } else {
    res.redirect(
      `/signup/enterOTP?username=${username}&fName=${fName}&email=${email}&password=${password}&role=${role}`
    );
  }
});
app.get("/signup/enterOTP", async (req, res) => {
  res.render("Otp", { message: "" });
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
  const sendEmail = (email, token) => {
    const mailOptions = {
      from: myMail,
      to: email,
      subject: "Email verification",
      text: `your otp is ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending email  " + error);
        return true;
      } else {
        console.log("Email sent: " + info.response);
        return false;
      }
    });
  };
  const email = req.query.email;
  sendEmail(email);
});
app.post("/signup/enterOTP", async (req, res) => {
  const votp = req.body.otp;
  if (votp != otp) {
    res.render("Otp", { message: "Wrong otp go back and Enter Otp again" });
  } else {
    async function insertIntoDatabase(data) {
      try {
        const collection = req.db.collection("test2");
        const result = await collection.insertOne(data);
      } catch (error) {
        res.render("Otp", { message: "Error while inserting data" });
      }
    }
    const username = req.query.username;
    const fName = req.query.fName;
    const email = req.query.email;
    const password = req.query.password;
    const role = req.query.role;
    const followers = [""];
    const following = [""];
    const dataToInserted = {
      username,
      fName,
      email,
      password,
      role,
      followers,
      following,
    };
    insertIntoDatabase(dataToInserted);

    res.redirect(`/user/profile/:${username}`);
  }
});
app.get("/user/forgetPwd", async (req, res) => {
  res.render("forgetPwd", { message: "" });
});
app.post("/user/forgetPwd", async (req, res) => {
  const upUname = req.body["upN"];
  const collection = await req.db.collection("test2");
  const dbUser = await collection.findOne({ username: upUname });
  if (!dbUser) {
    res.render("forgetPwd", { message: "Username Does not exists" });
  } else {
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
    const sendEmail = (email, token) => {
      const mailOptions = {
        from: myMail,
        to: dbUser.email,
        subject: "Your password is",
        text: `your otp is ${dbUser.password}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error in sending email  " + error);
          return true;
        } else {
          console.log("Email sent: " + info.response);
          return false;
        }
      });
    };
    const email = req.query.email;
    sendEmail(email);
    res.render("forgetPwd", {
      message:
        "Your password is sent to Your registered Email,check and go back to login page to continue",
    });
  }
});
app.get(`/user/profile/:username`, async (req, res) => {
  if (req.get("referer") == undefined) {
    return res.render("login", { message: "Login To Continue" });
  } else {
    const cuName = req.params.username.slice(1);
    try {
      const collection2 = req.db.collection("test2");
      const userDetails = await collection2
        .find({ username: cuName })
        .toArray();
      const collection1 = req.db.collection("projects");
      const items = await collection1.find({ username: cuName }).toArray();
      res.render("profile", { items: items, userDetails: userDetails });
    } catch (error) {
      console.log(error);
    }
  }
});
app.post("/user/profile/:username", upload.array("files"), async (req, res) => {
  const userName = req.params.username.slice(1);
  const files = [];
  const code = [];
  for (const i of req.files) {
    files.push({
      fileName: i.originalname,
    });
  }
  for (const j of req.files) {
    const fileContent = fs.readFileSync(j.path, "utf-8");
    code.push({
      content: fileContent,
    });
  }
  await req.db.collection("projects").insertOne({
    username: userName,
    projectName: req.body.nameP,
    projectDetails: req.body.detailP,
    AimP: req.body.aimP,
    files: files,
    Codes: code,
  });
  res.render("Others", { data: "Entered successfully" });
});
let fUsername;
app.post(`/user/:username/findUser`, async (req, res) => {
  const UName = req.params.username.slice(1);
  fUsername = req.body.findUser;
  const collection1 = req.db.collection("test2");
  const collection2 = req.db.collection("projects");
  const dName = await collection1.distinct("username");
  if (!dName.includes(fUsername)) {
    res.status(404).render("Others", { data: "Username does not exists" });
  } else if (UName === fUsername) {
    res.render("Others", {
      data: "Why you are searching Your self ?,Go back to Continue",
    });
  } else {
    const fuDetails = await collection1.find({ username: fUsername }).toArray();
    const puPDetails = await collection2
      .find({ username: fUsername })
      .toArray();
    res.render("findUser", {
      profileDetail: fuDetails,
      userProDetails: puPDetails,
    });
  }
});
app.put(`/user/:username/findUser`, async (req, res) => {
  const { followers } = req.body;
  const collection1 = req.db.collection("test2");
  const d = await collection1.findOne({ username: followers });
  const d2 = d.following;
  if (!d2.includes(fUsername)) {
    try {
      const result1 = await collection1.updateOne(
        { username: followers },
        { $push: { following: fUsername } }
      );
      const result2 = await collection1.updateOne(
        { username: fUsername },
        { $push: { followers: followers } }
      );
    } catch (error) {
      console.log(error);
    }
  }
});
app.get("/user/problems/:username", async (req, res) => {
  if (req.get("referer") == undefined) {
    return res.render("login", { message: "Login To Continue" });
  } else {
    const username = req.params.username.slice(1);
    const collection1 = req.db.collection("problems");
    const prbms = await collection1.find({ username }).toArray();
    res.render("problems", { myProblems: prbms });
  }
});
app.post("/user/problems/:username", async (req, res) => {
  req.body.username = req.params.username.slice(1);
  req.body.solutions = [];
  req.body.sPUname = [];
  try {
    const collection = req.db.collection("problems");
    const result = await collection.insertOne(req.body);
  } catch (error) {
    console.error("Error inserting into the database:", error);
    res.send("Error occur while inserting data");
  }
  res.render("Others", {
    data: "Your problem was published you will get Your answer soon , Go back to continue",
  });
});
app.get(`/user/problems/giveSol/:username`, async (req, res) => {
  if (req.get("referer") == undefined) {
    return res.render("login", { message: "Login To Continue" });
  } else {
    const username = req.params.username.slice(1);
    const collection1 = req.db.collection("problems");
    const prbms = await collection1.find().toArray();
    res.render("giveSolution", { problems: prbms });
  }
});
app.post(`/user/problems/giveSol/:username`, async (req, res) => {
  const username = req.params.username.slice(1);
  const { sUsername, sTypeP, sProblemI, sSolutions } = req.body;
  const collection1 = req.db.collection("problems");
  const result1 = await collection1.updateOne(
    {
      $and: [
        { username: sUsername },
        { typeP: sTypeP },
        { problemI: sProblemI },
      ],
    },
    { $push: { solutions: sSolutions, sPUname: username } }
  );
  res.redirect(`/user/problems/giveSol/:${username}`);
});
app.get("/problems/seeSolution", async (req, res) => {
  const collection1 = req.db.collection("problems");
  const result1 = await collection1.find().toArray();
  res.render("seeSolutions", { problemDetails: result1 });
});
app.get(`/user/Groups/:username`, async (req, res) => {
  if (req.get("referer") == undefined) {
    return res.render("login", { message: "Login To Continue" });
  } else {
    const requestUname = req.params.username.slice(1);
    const collection2 = req.db.collection("Groups");
    const userGrpList = await collection2
      .find({ grpCreator: requestUname })
      .toArray();
    res.render("groups", { groupList: userGrpList });
  }
});
app.post(`/user/Groups/:username`, async (req, res) => {
  console.log(req.body);
  const grpCreator = req.params.username.slice(1);
  const grpName = req.body.groupName;
  const groupDes = req.body.groupDes;
  const teamMembers = [""];
  const data = { grpName, groupDes, teamMembers, grpCreator };

  async function addGroups(data) {
    try {
      const collection5 = req.db.collection("Groups");
      const result = await collection5.insertOne(data);
    } catch (error) {
      res.render("Others", { data: "Error while Creating Groups" });
    }
  }
  addGroups(data);
  res.render("Others", { data: "Created Group success Fully" });
});
app.get(`/user/editProfile/:username`, async (req, res) => {
  if (req.get("referer") == undefined) {
    return res.render("login", { message: "Login To Continue" });
  } else {
    const username = req.params.username.slice(1);
    const collection1 = req.db.collection("test2");
    const collection2 = req.db.collection("projects");
    const profileD = await collection1.findOne({ username: username });
    const projects = await collection2.findOne({ username: username });
    res.render("editProfile", {
      profileDetails: profileD,
      Projects: projects,
      message: "",
    });
  }
});
app.post(`/user/editProfile/:username`, async (req, res) => {
  const userToUpdate = req.params.username.slice(1);
  const collection1 = req.db.collection("test2");
  const collection2 = req.db.collection("projects");
  const profileD = await collection1.findOne({ username: userToUpdate });
  const projects = await collection2.findOne({ username: userToUpdate });

  try {
    const newPass = req.body.newPassword;
    const newRole = req.body.newRole;
    const removeFollowing = req.body.removeFollowing;
    const dProject = req.body.dProject;
    const update1 = collection1.updateOne(
      { username: userToUpdate },
      {
        $set: { password: newPass, role: newRole },
        $pull: { following: removeFollowing },
      }
    );
    const update2 = collection2.deleteOne({
      username: userToUpdate,
      projectName: dProject,
    });
    const update3 = collection1.updateOne(
      {
        username: removeFollowing,
      },
      {
        $pull: { followers: userToUpdate },
      }
    );
  } catch (error) {
    res.render("editProfile", {
      profileDetails: profileD,
      Projects: projects,
      message: error,
    });
  }
  res.render("editProfile", {
    profileDetails: profileD,
    Projects: projects,
    message: "Profile Updated Success fully",
  });
});
app.get(`/user/FindProjects`, async (req, res) => {
  res.render("projects", { foundProjects: [] });
});
app.post(`/user/FindProjects`, async (req, res) => {
  const fProName = req.body.FindP;
  const collection1 = req.db.collection("projects");
  let fProjects = await collection1.find({ projectName: fProName }).toArray();
  res.render("projects", { foundProjects: fProjects });
});
app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${4000}`);
});
