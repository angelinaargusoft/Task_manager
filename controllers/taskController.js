const TaskService = require("../services/taskService");
class TaskController {
  static async createTask(req, res, next) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }
  static async getProjectTasks(req, res, next) {
    try {
      const tasks = await TaskService.getProjectTasks(req.params.projectId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }
  static async getTask(req, res, next) {
    try {
      const task = await TaskService.getTask(req.params.id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
  static async getUserTasks(req, res, next) {
    try {
      const tasks = await TaskService.getUserTasks(req.params.userId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }
  static async updateTask(req, res, next) {
    try {
      const updated = await TaskService.updateTask(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
  static async deleteTask(req, res, next) {
    try {
      const result = await TaskService.deleteTask(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = TaskController;
