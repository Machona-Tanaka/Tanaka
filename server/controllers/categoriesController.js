const db = require('../config/db');
const { validationResult } = require('express-validator');

module.exports = {
  // Create a new category (admin only)
  createCategory: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      
      // Check if category already exists
      const [existing] = await db.query(
        'SELECT id FROM categories WHERE name = ? LIMIT 1',
        [name]
      );
      
      if (existing.length > 0) {
        return res.status(409).json({ 
          error: 'Category already exists' 
        });
      }

      const [result] = await db.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description]
      );

      const [newCategory] = await db.query(
        'SELECT * FROM categories WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json(newCategory[0]);
    } catch (error) {
      next(error);
    }
  },

  // Get all categories
  getAllCategories: async (req, res, next) => {
    try {
      const [categories] = await db.query(
        'SELECT * FROM categories ORDER BY name ASC'
      );
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  // Get single category by ID
  getCategoryById: async (req, res, next) => {
    try {
      const [category] = await db.query(
        'SELECT * FROM categories WHERE id = ? LIMIT 1',
        [req.params.id]
      );

      if (category.length === 0) {
        return res.status(404).json({ 
          error: 'Category not found' 
        });
      }

      res.json(category[0]);
    } catch (error) {
      next(error);
    }
  },

  // Update category (admin only)
  updateCategory: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // Check if category exists
      const [existing] = await db.query(
        'SELECT id FROM categories WHERE id = ? LIMIT 1',
        [id]
      );
      
      if (existing.length === 0) {
        return res.status(404).json({ 
          error: 'Category not found' 
        });
      }

      // Check if new name already exists
      const [nameCheck] = await db.query(
        'SELECT id FROM categories WHERE name = ? AND id != ? LIMIT 1',
        [name, id]
      );
      
      if (nameCheck.length > 0) {
        return res.status(409).json({ 
          error: 'Category name already in use' 
        });
      }

      await db.query(
        'UPDATE categories SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
      );

      const [updatedCategory] = await db.query(
        'SELECT * FROM categories WHERE id = ? LIMIT 1',
        [id]
      );

      res.json(updatedCategory[0]);
    } catch (error) {
      next(error);
    }
  },

  // Delete category (admin only)
  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Check if category exists
      const [existing] = await db.query(
        'SELECT id FROM categories WHERE id = ? LIMIT 1',
        [id]
      );
      
      if (existing.length === 0) {
        return res.status(404).json({ 
          error: 'Category not found' 
        });
      }

      // Check if category is in use
      const [inUse] = await db.query(
        'SELECT id FROM podcasts WHERE category_id = ? LIMIT 1',
        [id]
      );
      
      if (inUse.length > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete category - it is being used by podcasts' 
        });
      }

      await db.query('DELETE FROM categories WHERE id = ?', [id]);
      
      res.json({ 
        success: true,
        message: 'Category deleted successfully' 
      });
    } catch (error) {
      next(error);
    }
  },

  // Get podcasts by category
  getPodcastsByCategory: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Check if category exists
      const [category] = await db.query(
        'SELECT name FROM categories WHERE id = ? LIMIT 1',
        [req.params.id]
      );
      
      if (category.length === 0) {
        return res.status(404).json({ 
          error: 'Category not found' 
        });
      }

      // Get podcasts
      const [podcasts] = await db.query(
        `SELECT p.*, u.username as author_name,
        (SELECT COUNT(*) FROM episodes e WHERE e.podcast_id = p.id) as episode_count
        FROM podcasts p
        JOIN users u ON p.author_id = u.id
        WHERE p.category_id = ?
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?`,
        [req.params.id, limit, offset]
      );

      // Get total count
      const [[{ total }]] = await db.query(
        'SELECT COUNT(*) as total FROM podcasts WHERE category_id = ?',
        [req.params.id]
      );
      
      res.json({
        category: category[0].name,
        podcasts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }
};