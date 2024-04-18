import { error } from "console";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Groups from "../models/Groups.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

export default async function socketIO(socket) {
  const cookies = socket.handshake.headers.cookie;
  function parseCookie(cookieString) {
    return cookieString.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
      return cookies;
    }, {});
  }
  const username = parseCookie(cookies)["loggedInUser"];
  console.log(username);
  console.log("user connected");
  socket.on("messageSent", (data) => {
    data.user = username;
    const groupName1=data.groupName
    console.log(data);
    Groups.updateOne(
      {
        grpName: groupName1,
      },
      { $push: { groupCharts: data } }
    ).catch((error)=>{
      console.log("Error occur while inserting The chat message"+error)
    })

    try {
      socket.emit("newMessage", data);
    } catch (error) {
      console.log(
        "Error occur from server side while emitting the message" + error
      );
    }
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
}
