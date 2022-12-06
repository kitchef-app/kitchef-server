
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketHandler = require("./config/socketHandler");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

const onConnection = (socket) => {
  socketHandler(io, socket)
}

io.on('connection', 
onConnection
// (socket) => {
//   console.log('a user connected');
//   socket.on("join-rooms", (roomName) => {
// 	// console.log(roomName);
// 	socket.join(roomName);
//   })
//   socket.on("send-location", (payload) => {
// 	console.log(payload, "ini dia");
// 	io.to(payload.roomName).emit("send-location", payload.location)
//   })
//   socket.on("leave-room", (roomName) => {
// 	console.log(roomName);
// 	socket.leave(roomName)
//   })
//   socket.on("disconnect", () => {
// 	//ngapain
// 	socket.disconnect()
//   })
// }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.status(201).json({ msg: "running" })
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

module.exports = { server, io };