const pool = require("../db/db");
class ProjectModel {

  static async create(project) {
    const { id, name, description, createdBy } = project;
    await pool.execute(
      "INSERT INTO Projects (id, name, description, createdBy) VALUES (?, ?, ?, ?)",
      [id, name, description, createdBy]
    );
    return project;
  }

  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT p.*, u.first_name, u.last_name, u.email
       FROM Projects p
       LEFT JOIN Users u ON p.createdBy = u.id`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.first_name, u.last_name, u.email
       FROM Projects p
       LEFT JOIN Users u ON p.createdBy = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, fields) {
    const { name, description } = fields;
    await pool.execute(
      "UPDATE Projects SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
  }

  static async delete(id) {
    await pool.execute("DELETE FROM Projects WHERE id = ?", [id]);
  }
}

module.exports = ProjectModel;