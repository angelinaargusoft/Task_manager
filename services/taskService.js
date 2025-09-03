const TaskModel = require("../models/taskModel");
const Member = require("../models/memberModel");
const NotificationService = require("./notificationService");
const { v4: uuidv4 } = require("uuid");
class TaskService {
  static async createTask(data) {
    const task = {
      id: uuidv4(),
      ...data
    };

    // Trigger: TaskAssigned
    // Get the userId for the assigned member
    const member = await Member.findById(task.assigned_to);
    if (member) {
      await NotificationService.createNotification(
        member.user_id,  
        "TaskAssigned",
        `You have been assigned a new task: ${task.title}`
      );
    }

    return await TaskModel.create(task);
  }
  static async getAllTasks() {
    return await TaskModel.findAll(); 
  }
  static async getTaskById(id) {
    return await TaskModel.findById(id);
  }
  static async updateTask(id, data) {
    await TaskModel.update(id, data);

    const member = await Member.findById(data.assigned_to);
    if (member) {
      await NotificationService.createNotification(
        member.user_id,
        "TaskUpdated",
        `Task "${data.title}" has been updated.`
      );
    }


    return { id, ...data };
  }

  static async deleteTask(id) {
    const task = await TaskModel.findById(id);
    await TaskModel.delete(id);

    // Trigger: TaskDeleted
    const member = await Member.findById(task.assigned_to);
    if (member) {
      await NotificationService.createNotification(
        member.user_id,
        "TaskDeleted",
        `Task "${task.title}" has been deleted.`
      );
    }

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












