import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server (server, {
    cors: {
        origin: "http://localhost:4000"
    }
});

io.on("connection", (socket) => {
    console.log("user is connected to socket");
    socket.on("send", (data) => {
        console.log(data.message + " from server");
        socket.broadcast.emit("send", data);
    });
});

io.on("disconnect", (socket) => {
    console.log("user disconnected");
});

const PORT = 3000;
server.listen(PORT, ()=>{console.log("server listening on port 3000")});