const TaskService = require("../services/taskService");
class TaskController {
  static async createTask(req, res) {
    try {

      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getTaskById(req, res) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getTasksByUser(req, res) {
    try {
      const tasks = await TaskService.getTasksByUser(req.params.userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getTasksByProject(req, res) {
    try {
      const tasks = await TaskService.getTasksByProject(req.params.projectId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async updateTask(req, res) {
    try {
      const updatedTask = await TaskService.updateTask(
        req.params.id,
        req.body
      );
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async deleteTask(req, res) {
    try {
      const result = await TaskService.deleteTask(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = TaskController;










