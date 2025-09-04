const { io } = require("socket.io-client");
const socket = io("http://localhost:3000"); // or process.env.APP_PORT
socket.on("connect", () => {
  console.log(" Connected:", socket.id);
  socket.emit("join", "user-uuid-123");
});
socket.on("notification", (data) => {
  console.log("Notification:", data);
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});