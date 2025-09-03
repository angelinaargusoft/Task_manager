const NotificationService = require("../services/notificationService");

exports.createNotification = async (req, res, next) => {
  try {
    const { userId, type, message } = req.body;
    const notification = await NotificationService.createNotification(userId, type, message);
    res.status(201).json(notification);
  } catch (err) {
    next(err);
  }
};

exports.getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await NotificationService.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await NotificationService.markNotificationAsRead(id);
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await NotificationService.deleteNotification(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};








