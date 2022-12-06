const io = require("socket.io-client");
const { io: server } = require("../app");

describe("Suite of unit tests", function() {
  server.attach(3010);
  let socket;

  beforeEach(function(done) {
    // Setup
    socket = io("http://localhost:3010");

    socket.on("connect", function() {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function() {
      console.log("disconnected...");
    });
  });

  afterEach(function(done) {
    // Cleanup
    if (socket.connected) {
      console.log("disconnecting...");
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log("no connection to break...");
    }
    done();
  });

  afterAll(function(done) {
    socket.disconnect();
    server.close();
    done();
  });

  describe("Join room", function() {
    test("join room", (done) => {
      socket.emit("join-rooms", 1);

      socket.on("join-rooms", (payload) => {
        try {
          expect(payload).toBe("success join room");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Send location", function() {
    test("send location", (done) => {
	  socket.emit("join-rooms", 1)
      socket.emit("send-location", {
		roomName: 1,
		location: {
			latitude: 37.78825,
			longitude: -122.4324
		}
	  });

      socket.on("send-location", (payload) => {
        try {
		console.log(payload, "payloadd");
          expect(payload).toBeInstanceOf(Object);
          expect(payload).toHaveProperty("latitude");
          expect(payload).toHaveProperty("longitude");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Leave room", function() {
    test("leave room", (done) => {
      socket.emit("leave-room", 1);

      socket.on("leave-room", (payload) => {
        try {
          expect(payload).toBe("success left room");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

});