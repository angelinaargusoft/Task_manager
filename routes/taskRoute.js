const express = require("express");
const TaskController = require("../controllers/taskController");
const router = express.Router();
router.post("/", TaskController.createTask);
router.get("/project/:projectId", TaskController.getProjectTasks);
router.get("/user/:userId", TaskController.getUserTasks); // :white_check_mark: new
router.get("/:id", TaskController.getTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
module.exports = router;