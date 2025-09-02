const db = require("../db/db");
class TaskModel {
  static async create(task) {
    const [result] = await db.execute(
      `INSERT INTO Tasks
        (id, project_id, title, description, status, created_by, assigned_by, assigned_to, due_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        task.id,
        task.project_id,
        task.title,
        task.description,
        task.status,
        task.created_by,
        task.assigned_by,
        task.assigned_to,
        task.due_date
      ]
    );
    return result;
  }
  static async findAll() {
    const [rows] = await db.execute(`SELECT * FROM Tasks`);
    return rows;
  }
  static async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM Tasks WHERE id = ?`, [id]);
    return rows[0];
  }
  static async update(id, data) {
    await db.execute(
      `UPDATE Tasks SET title=?, description=?, status=?, assigned_by=?, assigned_to=?, due_date=? WHERE id=?`,
      [data.title, data.description, data.status, data.assigned_by, data.assigned_to, data.due_date, id]
    );
  }
  static async delete(id) {
    await db.execute(`DELETE FROM Tasks WHERE id = ?`, [id]);
  }
  static async findByProject(projectId) {
    const [rows] = await db.execute(`SELECT * FROM Tasks WHERE project_id = ?`, [projectId]);
    return rows;
  }
  static async findByUser(userId) {
    const [rows] = await db.execute(
      `SELECT * FROM Tasks WHERE assigned_to = ? OR created_by = ?`,
      [userId, userId]
    );
    return rows;
  }
}
module.exports = TaskModel;
















