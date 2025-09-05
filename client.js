const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

const userId = "67600902-2409-4790-b66c-76eedcc43065";   // change for each client
const projectId = "0671e3e6-8b4b-48b7-9c5a-4026a0551dbe";       // all should join same project for activity feed

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("join", userId);          // personal room
  socket.emit("joinProject", projectId); // project room
});

socket.on("notification", (data) => {
  console.log("Personal activity:", data);
});

socket.on("activity", (data) => {
  console.log("Project Activity:", data);
});