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

  static async update(id, { first_name, last_name, active }) {
    const fields = [];
    const values = [];

    if (first_name !== undefined) {
      fields.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name !== undefined) {
      fields.push("last_name = ?");
      values.push(last_name);
    }
    if (active !== undefined) {
      fields.push("active = ?");
      values.push(active);
    }
    if (fields.length === 0) {
      throw new Error("No valid fields to update");
    }
    values.push(id);
    console.log(values)
    const sql = `UPDATE Users
               SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;

    await pool.query(sql, values);

    const [rows] = await pool.query(
      "SELECT id, first_name, last_name, email, active FROM Users WHERE id = ?",
      [id]
    );
    return rows[0];
  };

  static async delete(id) {
    await pool.execute("DELETE FROM Users WHERE id = ?", [id]);
  }
}

module.exports = UserModel;