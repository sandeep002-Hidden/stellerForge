import express from "express";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import cookieParser from 'cookie-parser';
import path from "path";
import bodyParser from "body-parser";
import myRouter from "./routes/user.js"
import loggedUser from "./routes/logedUser.js"
import dotenv from 'dotenv';
import http from "http"
import { Server } from 'socket.io';
import socketIO from "./routes/socketIO.js";



dotenv.config();


const app = express();
const server = http.createServer(app);

const io = new Server(server);



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




app.use("/",myRouter)

app.use("/user",loggedUser)


io.on('connection', socketIO);


server.listen(4000, () => {
  console.log(`Server is running on http://localhost:${4000}`);
});