const TaskModel = require("../models/taskModel");
const { v4: uuidv4 } = require("uuid");
class TaskService {
  static async createTask(data) {
    const task = {
      id: uuidv4(),
      ...data,
      status: data.status || "Pending",
    };
    return await TaskModel.create(task);
  }
  static async getProjectTasks(project_id) {
    return await TaskModel.findByProject(project_id);
  }
  static async getTask(id) {
    return await TaskModel.findById(id);
  }
  static async updateTask(id, fields) {
    await TaskModel.update(id, fields);
    return { id, ...fields };
  }
  static async deleteTask(id) {
    await TaskModel.remove(id);
    return { message: "Task deleted successfully" };
  }
}
module.exports = TaskService;






