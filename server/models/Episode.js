const db = require('../config/db');

class Episode {
  static async create({ podcastId, title, description, audioUrl, duration }) {
    const [result] = await db.query(
      'INSERT INTO episodes (podcast_id, title, description, audio_url, duration) VALUES (?, ?, ?, ?, ?)',
      [podcastId, title, description, audioUrl, duration]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM episodes WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  }

  static async findByPodcast(podcastId) {
    const [episodes] = await db.query(
      'SELECT * FROM episodes WHERE podcast_id = ? ORDER BY publish_date DESC',
      [podcastId]
    );
    return episodes;
  }

  static async update(id, { title, description, audioUrl, duration }) {
    await db.query(
      'UPDATE episodes SET title = ?, description = ?, audio_url = ?, duration = ? WHERE id = ?',
      [title, description, audioUrl, duration, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM episodes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async incrementDownloads(id) {
    await db.query(
      'UPDATE episodes SET downloads = downloads + 1 WHERE id = ?',
      [id]
    );
  }
}

module.exports = Episode;