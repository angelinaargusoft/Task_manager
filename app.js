const express = require("express");
const taskRoutes = require("./routes/taskRoute");
const projectRoutes = require("./routes/projectRoute");
const notificationRoutes = require("./routes/notificationRoute");
const userRoutes = require("./routes/userRoute");
const memberRoutes = require("./routes/memberRoute");
const authRoutes = require("./routes/authRoute");
const app = express();
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome" });
});
module.exports = app;