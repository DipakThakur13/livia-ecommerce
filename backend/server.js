const io = require("socket.io")(server, {
    cors: { origin: "*" },
  });
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("sendMessage", async ({ userId, message, sender }) => {
      const chat = await Chat.create({ userId, message, sender });
      io.emit("receiveMessage", chat);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  