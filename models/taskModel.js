const pool = require("../db/db");
class TaskModel {
  static async create(task) {
    const { id, project_id, created_by, assigned_by, assigned_to, title, description, status, due_date } = task;
    await pool.execute(
      `INSERT INTO Tasks (id, project_id, created_by, assigned_by, assigned_to, title, description, status, due_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, project_id, created_by, assigned_by, assigned_to, title, description, status, due_date]
    );
    return task;
  }
  static async findByProject(project_id) {
    const [rows] = await pool.execute(
      `SELECT t.*,
              cu.first_name AS created_by_first, cu.last_name AS created_by_last,
              abu.first_name AS assigned_by_first, abu.last_name AS assigned_by_last,
              atu.first_name AS assigned_to_first, atu.last_name AS assigned_to_last
       FROM Tasks t
       JOIN Users cu ON t.created_by = cu.id
       JOIN Users abu ON t.assigned_by = abu.id
       JOIN Users atu ON t.assigned_to = atu.id
       WHERE t.project_id = ?`,
      [project_id]
    );
    return rows;
  }
  static async findByAssignedTo(user_id) {
  const [rows] = await pool.execute(
    `SELECT t.*,
            p.name AS project_name,
            cu.first_name AS created_by_first, cu.last_name AS created_by_last,
            abu.first_name AS assigned_by_first, abu.last_name AS assigned_by_last
     FROM Tasks t
     JOIN Projects p ON t.project_id = p.id
     JOIN Users cu ON t.created_by = cu.id
     JOIN Users abu ON t.assigned_by = abu.id
     WHERE t.assigned_to = ?`,
    [user_id]
  );
  return rows;
}
  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM Tasks WHERE id = ?", [id]);
    return rows[0];
  }
  static async update(id, fields) {
    const updates = Object.keys(fields).map((f) => `${f} = ?`).join(", ");
    const values = Object.values(fields);
    values.push(id);
    await pool.execute(`UPDATE Tasks SET ${updates} WHERE id = ?`, values);
  }
  static async remove(id) {
    await pool.execute("DELETE FROM Tasks WHERE id = ?", [id]);
  }
}
module.exports = TaskModel;









