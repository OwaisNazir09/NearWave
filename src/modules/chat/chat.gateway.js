

const chatService = require("./chat.service");

const onlineUsers = new Map();

exports.init = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(socket.id, userId);
      console.log("User joined:", userId);
    });

    socket.on("send-message", async (msg) => {
      const saved = await chatService.saveMessage(msg);

      io.emit("receive-message", saved);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      console.log("User disconnected:", socket.id);
    });
  });
};
