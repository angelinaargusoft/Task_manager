const pool = require("../db/db");

class UserModel {

  static async create(user) {
    const { id, first_name, last_name, email, password } = user;
    await pool.execute(
      "INSERT INTO Users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [id, first_name, last_name, email, password]
    );
    return user;
  }

  static async findAll() {
    const [rows] = await pool.execute("SELECT * FROM Users");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM Users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM Users WHERE email = ?", [email]);
    return rows[0];
  }

  static async update(id, fields) {
    const { first_name, last_name, active } = fields;
    await pool.execute(
      "UPDATE Users SET first_name = ?, last_name = ?, active = ? WHERE id = ?",
      [first_name, last_name, active, id]
    );
  }
  
  static async delete(id) {
    await pool.execute("DELETE FROM Users WHERE id = ?", [id]);
  }
}

module.exports = UserModel;