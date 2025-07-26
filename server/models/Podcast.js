const db = require('../config/db');

class Podcast {
  static async create({ title, description, coverImageUrl, authorId, categoryId }) {
    const [result] = await db.query(
      'INSERT INTO podcasts (title, description, cover_image_url, author_id, category_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, coverImageUrl, authorId, categoryId]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT p.*, u.username as author_name, c.name as category_name 
       FROM podcasts p
       JOIN users u ON p.author_id = u.id
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findAllPaginated(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [podcasts] = await db.query(
      `SELECT p.*, u.username as author_name, c.name as category_name,
      (SELECT COUNT(*) FROM episodes e WHERE e.podcast_id = p.id) as episode_count
      FROM podcasts p
      JOIN users u ON p.author_id = u.id
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM podcasts');
    
    return {
      podcasts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async search(query) {
    try {
      const [results] = await db.query(
        `SELECT p.*, 
        MATCH(p.title, p.description) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
        FROM podcasts p
        WHERE MATCH(p.title, p.description) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance DESC`,
        [query, query]
      );
      return results;
    } catch (error) {
      // Fallback to LIKE search
      const likeTerm = `%${query}%`;
      const [results] = await db.query(
        'SELECT * FROM podcasts WHERE title LIKE ? OR description LIKE ?',
        [likeTerm, likeTerm]
      );
      return results;
    }
  }
}

module.exports = Podcast;