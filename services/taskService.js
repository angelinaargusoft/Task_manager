const TaskModel = require("../models/taskModel");
const { v4: uuidv4 } = require("uuid");
class TaskService {
  static async createTask(data) {
    const task = {
      id: uuidv4(),
      ...data
    };
    return await TaskModel.create(task);
  }
  static async getAllTasks() {
    return await TaskModel.findAll(); // :white_check_mark: safe now
  }
  static async getTaskById(id) {
    return await TaskModel.findById(id);
  }
  static async updateTask(id, data) {
    await TaskModel.update(id, data);
    return { id, ...data };
  }
  static async deleteTask(id) {
    await TaskModel.delete(id);
    return { message: "Task deleted successfully" };
  }
  static async getTasksByProject(projectId) {
    return await TaskModel.findByProject(projectId);
  }
  static async getTasksByUser(userId) {
    return await TaskModel.findByUser(userId);
  }
}
module.exports = TaskService;












