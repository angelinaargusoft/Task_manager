const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/",authenticate, notificationController.createNotification);
router.get("/:userId", authenticate, notificationController.getUserNotifications);
router.put("/:id", authenticate, notificationController.markNotificationAsRead);
router.delete("/:id", authenticate, notificationController.deleteNotification);

module.exports = router;