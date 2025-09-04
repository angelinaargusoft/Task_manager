const Notification = require("../models/notificationModel");
const { v4: uuidv4 } = require("uuid");

class NotificationService {
  static async createNotification(userId, type, message) {
    const notification = await Notification.create({
      id: uuidv4(),
      user_id: userId,
      type,
      message,
      is_read: false,
    });

    return notification;
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