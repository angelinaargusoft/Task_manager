const { v4: uuidv4 } = require("uuid");
let notifications = [];
class Notification {
  constructor(userId, type, message) {
    this.id = uuidv4();
    this.user_id = userId;   // FK -> User
    this.type = type;        // e.g. "TaskAssigned", "ProjectUpdate"
    this.message = message;
    this.read = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
module.exports = { notifications, Notification };