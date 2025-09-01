const { notifications, Notification } = require("../models/notificationModel");
exports.getNotifications = (req, res) => {
  res.json(notifications);
};
exports.getNotificationById = (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id);
  if (!notification) return res.status(404).json({ message: "Notification not found" });
  res.json(notification);
};
exports.createNotification = (req, res) => {
  const { user_id, type, message } = req.body;
  const newNotification = new Notification(user_id, type, message);
  notifications.push(newNotification);
  res.status(201).json(newNotification);
};
exports.updateNotification = (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id);
  if (!notification) return res.status(404).json({ message: "Notification not found" });
  Object.assign(notification, req.body, { updatedAt: new Date() });
  res.json(notification);
};
exports.deleteNotification = (req, res) => {
  const index = notifications.findIndex(n => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Notification not found" });
  notifications.splice(index, 1);
  res.status(204).send();
};









