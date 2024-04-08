import { fileURLToPath } from "url";
import express, { urlencoded } from "express";
import connectDB from "./db.js";
import cookieParser from 'cookie-parser';
import path from "path";
import bodyParser from "body-parser";
import { error, profile, warn } from "console";
import fs from "fs";
import multer from "multer";
import myRouter from "./routes/user.js"
import loggedUser from "./routes/logedUser.js"
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parentDir = path.dirname(__dirname);
app.use(express.static("public"));
app.set("views", path.join(parentDir, "public", "ejs"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
try{
  connectDB()
  console.log("Connected success fully")
}
catch(error){
  console.log("error")
}
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use("/",myRouter)

app.use("/user",loggedUser)


app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${4000}`);
});