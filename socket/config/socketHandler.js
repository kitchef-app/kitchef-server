module.exports = (io, socket) => {
//   const sendMessage = (payload) => {
//     socket.emit("message:send", payload);
//   };

//   socket.on("message:send", sendMessage);

  const joinRoom = (roomName) => {
	socket.join(roomName)
  console.log('a user join');
	io.to(roomName).emit("join-rooms", "success join room")
  }
  const sendLocation = (payload) => {
	console.log(payload, "tes");
	io.to(payload.roomName).emit("send-location", payload.location)
  }
  const leaveRoom = (roomName) => {
	console.log(roomName);
	socket.emit("leave-room", "success left room")
	socket.leave(roomName)
  }
  const disconnect = () => {
	socket.disconnect()
  }

  socket.on("join-rooms", joinRoom)
  socket.on("send-location", sendLocation)
  socket.on("leave-room", leaveRoom)
  socket.on("disconnect", disconnect)
};