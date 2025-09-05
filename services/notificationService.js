const Notification = require("../models/notificationModel");
const { v4: uuidv4 } = require("uuid");
let io;
class NotificationService {
  static init(ioInstance) {
    io = ioInstance;
  }
  static async createNotification(userId, type, message) {
    const notification = await Notification.create({
      id: uuidv4(),
      user_id: userId,
      type,
      message,
      is_read: false,
    });

    if (io) {
      io.to(userId).emit("notification", notification);
    } else {
      console.warn(":warning: Socket.io not initialized");
    }

    return notification;
  }

  static async broadcastToProject(projectId, type, message) {
    const activity = {
      project_id: projectId,
      type,
      message,
      created_at: new Date()
    };
    if (io) {
      io.to(projectId).emit("activity", activity);
    }
    return activity;
  }

  static async getUserNotifications(userId) {
    return await Notification.findByUser(userId);
  }

  static async markNotificationAsRead(id) {
    return await Notification.markAsRead(id);
  }

  static async deleteNotification(id) {
    return await Notification.delete(id);
  }
}

module.exports = NotificationService;