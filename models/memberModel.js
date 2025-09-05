const pool = require("../db/db");
class MemberModel {

  static async add(member) {
    const { id, project_id, user_id, role } = member;
    await pool.execute(
      "INSERT INTO Members (id, project_id, user_id, role) VALUES (?, ?, ?, ?)",
      [id, project_id, user_id, role]
    );
    return member;
  }

    static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM Members WHERE id = ?`,
      [id]
    );
    return rows[0]; // returns single member or undefined
  }

  static async findByProject(project_id) {
    const [rows] = await pool.execute(
      `SELECT m.*, u.first_name, u.last_name, u.email
       FROM Members m
       JOIN Users u ON m.user_id = u.id
       WHERE m.project_id = ?`,
      [project_id]
    );
    return rows;
  }

  static async findByUser(user_id) {
    const [rows] = await pool.execute(
      `SELECT m.*, p.name AS project_name
       FROM Members m
       JOIN Projects p ON m.project_id = p.id
       WHERE m.user_id = ?`,
      [user_id]
    );
    return rows;
  }

  static async updateRole(id, role) {
    await pool.execute("UPDATE Members SET role = ? WHERE id = ?", [role, id]);
  }
  
  static async remove(id) {
    await pool.execute("DELETE FROM Members WHERE id = ?", [id]);
  }
}

module.exports = MemberModel;