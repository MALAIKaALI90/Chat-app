import express from "express";


import cors from "cors";
const app=express();
import http from "http";
import { Server } from "socket.io";
import userRouter from "./route/userRoutes.js";
import msgRouter from "./route/messageRoutes.js";
const server=http.createServer(app)

//initiaze socket.io server
export const io =new Server(server,{cors:{origin:"*"}})

//store online user
export const userSocketMap={}

//socket.io connection handler
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("user connected",userId);
    if (userId) userSocketMap[userId]=socket.id;
    //Emt Online user to all connected clints
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        console.log("disconnected",userId);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
        
    })
})
//ap.use mainly use fr stup middleware
app.use(cors({
    origin:{
        path:"*",
        credential:true}    
}))
app.use(express.json({limit:"4mb"}))
//if data come from URL THEN

app.use(express.urlencoded({extended:true,limit:"4mb"}))
app.use(express.static("public"))

app.use("/api/auth",userRouter)

app.use("/api/msgs",msgRouter)

export {app}

