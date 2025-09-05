require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const app = require("./app"); 
const NotificationService = require("./services/notificationService");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

NotificationService.init(io);
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined personal room`);
  });
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`User joined project room: ${projectId}`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(process.env.APP_PORT || 5000, () => {
  console.log(`Server running on port ${process.env.APP_PORT || 3000}`);
});





