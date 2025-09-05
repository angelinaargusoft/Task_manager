const express = require("express");
const TaskController = require("../controllers/taskController");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, TaskController.createTask);
router.get("/", authenticate, TaskController.getAllTasks);
router.get("/:id", authenticate, TaskController.getTaskById);
router.put("/:id", authenticate, TaskController.updateTask);
router.delete("/:id", authenticate, TaskController.deleteTask);

router.get("/user/:userId", authenticate, TaskController.getTasksByUser);
router.get("/project/:projectId", authenticate, TaskController.getTasksByProject);

module.exports = router;