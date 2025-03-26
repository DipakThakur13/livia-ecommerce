const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP Server for Express & WebSockets
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// WebSocket (Live Chat) Handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Broadcast message
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const returnRoutes = require("./routes/returns");
app.use("/api/returns", returnRoutes);

const orderTrackingRoutes = require("./routes/orderTracking");
app.use("/api/tracking", orderTrackingRoutes);


// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
