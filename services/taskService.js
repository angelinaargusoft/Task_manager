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

    // Save task
    const createdTask = await TaskModel.create(task);

    // Get all members of this project
    const members = await Member.findByProject(task.project_id);
    if (members && members.length > 0) {
      for (const member of members) {
        if (member.id === task.assigned_to) {
          // Notify assigned user
          await NotificationService.createNotification(
            member.user_id,
            "TaskAssigned",
            `You have been assigned a new task: ${task.title}`
          );
        } else {
          // Notify other members
          await NotificationService.createNotification(
            member.user_id,
            "TaskCreated",
            `A new task "${task.title}" was created in your project.`
          );
        }
      }
    }
    return createdTask;
  }

  static async updateTask(id, data) {
    await TaskModel.update(id, data);

    // Get task after update
    const updatedTask = await TaskModel.findById(id);

    // Get all project members
    const members = await Member.findByProject(updatedTask.project_id);
    if (members && members.length > 0) {
      for (const member of members) {
        if (member.id === data.assigned_to) {
          // Notify assigned user
          await NotificationService.createNotification(
            member.user_id,
            "TaskUpdatedAssigned",
            `Your assigned task "${updatedTask.title}" has been updated.`
          );
        } else {
          // Notify others
          await NotificationService.createNotification(
            member.user_id,
            "TaskUpdated",
            `Task "${updatedTask.title}" has been updated in your project.`
          );
        }
      }
    }
    return updatedTask;
  }
  
  static async deleteTask(id) {
    const task = await TaskModel.findById(id);
    await TaskModel.delete(id);
    // Notify all members that task was deleted
    const members = await Member.findByProject(task.project_id);
    if (members && members.length > 0) {
      for (const member of members) {
        await NotificationService.createNotification(
          member.user_id,
          "TaskDeleted",
          `Task "${task.title}" has been deleted.`
        );
      }
    }
    return { message: "Task deleted successfully" };
  }
}
module.exports = TaskService;












