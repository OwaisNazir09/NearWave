
const activeUsers = new Map(); // socket.id → userId
const userSockets = new Map(); // userId → socket.id

exports.init = (io) => {
  io.on("connection", (socket) => {
    console.log("RTC: user connected", socket.id);

    socket.on("register-rtc", (userId) => {
      activeUsers.set(socket.id, userId);
      userSockets.set(userId, socket.id);

      console.log(`RTC: ${userId} registered with socket ${socket.id}`);
    });

    // Incoming call request
    socket.on("call-user", ({ from, to, offer }) => {
      const targetSocket = userSockets.get(to);

      if (targetSocket) {
        io.to(targetSocket).emit("incoming-call", {
          from,
          offer,
        });
      }
    });

    // Accept call & send answer
    socket.on("accept-call", ({ from, to, answer }) => {
      const callerSocket = userSockets.get(to);

      if (callerSocket) {
        io.to(callerSocket).emit("call-accepted", {
          from,
          answer,
        });
      }
    });

    // ICE candidate exchange
    socket.on("ice-candidate", ({ to, candidate }) => {
      const targetSocket = userSockets.get(to);

      if (targetSocket) {
        io.to(targetSocket).emit("ice-candidate", {
          candidate,
        });
      }
    });

    socket.on("disconnect", () => {
      const userId = activeUsers.get(socket.id);
      userSockets.delete(userId);
      activeUsers.delete(socket.id);

      console.log("RTC: user disconnected", socket.id);
    });
  });
};
