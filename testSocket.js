const { io } = require("socket.io-client");
const socket = io("http://localhost:3000"); // or process.env.APP_PORT
socket.on("connect", () => {
  console.log(" Connected:", socket.id);
  socket.emit("join", "15c549d9-53ef-4ae8-9f3d-18413a46ecc3");
});
socket.on("notification", (data) => {
  console.log("Notification:", data);
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});