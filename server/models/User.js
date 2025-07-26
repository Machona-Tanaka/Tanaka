const db = require('../config/db');

class User {
  static async create({ username, email, passwordHash }) {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;