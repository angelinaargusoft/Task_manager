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
    const createdTask = await TaskModel.create(task);

    // Get assigned user
    const member = await Member.findById(task.assigned_to);

    if (member) {
      // Direct notification to the assigned user
      await NotificationService.createNotification(
        member.user_id,
        "TaskAssigned",
        `You have been assigned a new task: ${task.title}`
      );
      await NotificationService.broadcastToProject(
      task.project_id,
      "TaskCreated",
      `Task "${task.title}" created in project ${task.project_id}`
    );
    }
    
    return createdTask;
  }
  static async updateTask(id, data) {
    await TaskModel.update(id, data);
    const updatedTask = await TaskModel.findById(id);
    const member = await Member.findById(data.assigned_to);
    if (member) {
      await NotificationService.createNotification(
        member.user_id,
        "TaskUpdated",
        `Your assigned task "${updatedTask.title}" has been updated.`
      );
    }
     await NotificationService.broadcastToProject(
      data.project_id,
      "TaskUpdated",
      `Task "${data.title}" updated in project ${data.project_id}`
    );
    return updatedTask;
  }

  static async deleteTask(id) {
    const task = await TaskModel.findById(id);
    await TaskModel.delete(id);
    await NotificationService.broadcastToProject(
      task.project_id,
      "TaskDeleted",
      `Task "${task.title}" deleted from project ${task.project_id}`
    );
    return { message: "Task deleted successfully" };
  }
}

module.exports = TaskService;












