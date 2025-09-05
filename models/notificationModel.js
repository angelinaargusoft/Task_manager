const db = require("../db/db");
class Notification {
  static async create(notification) {
    const query = `
      INSERT INTO Notifications (id, user_id, type, message, is_read)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { id, user_id, type, message, is_read } = notification;
    await db.execute(query, [id, user_id, type, message, is_read]);
    return notification;
  }

  static async findByUser(userId) {
    const [rows] = await db.execute(
      "SELECT * FROM Notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  }

  static async markAsRead(id) {
    await db.execute(
      "UPDATE Notifications SET is_read = ?, updated_at = NOW() WHERE id = ?",
      [true, id]
    );
    return { id, is_read: true };
  }

  static async delete(id) {
    await db.execute("DELETE FROM Notifications WHERE id = ?", [id]);
    return { id, deleted: true };
  }
}

module.exports = Notification;