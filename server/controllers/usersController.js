// usersController.js
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * User Controller
 * Handles all database operations for users
 */
const usersController = {
  registerUser: async (userData) => {
    try {
      const { username, email, password } = userData;

      // Check if user already exists
      const [existingUser] = await db.query(
        'SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1',
        [email, username]
      );

      if (existingUser.length > 0) {
        throw new Error('User with this email or username already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const query = `
        INSERT INTO users (username, email, password_hash, created_at)
        VALUES (?, ?, ?, NOW())
      `;
      const [result] = await db.query(query, [username, email, hashedPassword]);

      // Fetch the created user
      const [userRows] = await db.query(
        'SELECT id, username, email, bio, avatar_url, created_at FROM users WHERE id = ?',
        [result.insertId]
      );

      return userRows[0];
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  },

  loginUser: async (email, password) => {
    try {
      const [result] = await db.query(
        'SELECT id, username, email, password_hash, bio, avatar_url FROM users WHERE email = ? LIMIT 1',
        [email]
      );

      if (result.length === 0) {
        throw new Error('Invalid email or password');
      }

      const user = result[0];

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      delete user.password_hash;

      return { ...user, token };
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  },

  getUserById: async (userId) => {
    try {
      const query = `
        SELECT 
          u.id, u.username, u.email, u.bio, u.avatar_url, u.created_at,
          (SELECT COUNT(*) FROM podcasts WHERE author_id = u.id) as podcast_count,
          (SELECT COUNT(*) FROM subscriptions WHERE user_id = u.id) as following_count,
          (SELECT COUNT(*) FROM subscriptions WHERE podcast_id IN 
            (SELECT id FROM podcasts WHERE author_id = u.id)) as followers_count
        FROM users u
        WHERE u.id = ?
      `;
      const [result] = await db.query(query, [userId]);
      if (result.length === 0) {
        throw new Error('User not found');
      }
      return result[0];
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  updateUser: async (userId, updateData) => {
    try {
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(updateData)) {
        if (['id', 'email', 'password_hash', 'created_at'].includes(key)) {
          continue;
        }
        fields.push(`${key} = ?`);
        values.push(value);
      }

      if (fields.length === 0) {
        throw new Error('No valid fields provided for update');
      }

      fields.push('updated_at = NOW()');
      values.push(userId);

      const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = ?
      `;

      const [result] = await db.query(query, values);

      if (result.affectedRows === 0) {
        throw new Error('User not found');
      }

      const [userRows] = await db.query(
        'SELECT id, username, email, bio, avatar_url, created_at, updated_at FROM users WHERE id = ?',
        [userId]
      );

      return userRows[0];
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    try {
      const [userResult] = await db.query(
        'SELECT password_hash FROM users WHERE id = ? LIMIT 1',
        [userId]
      );

      if (userResult.length === 0) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        userResult[0].password_hash
      );

      if (!passwordMatch) {
        throw new Error('Current password is incorrect');
      }

      const saltRounds = 10;
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const [updateResult] = await db.query(
        'UPDATE users SET password_hash = ? WHERE id = ?',
        [newHashedPassword, userId]
      );

      if (updateResult.affectedRows === 0) {
        throw new Error('User not found');
      }

      return true;
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  },

  deleteUser: async (userId) => {
    try {
      await db.query('DELETE FROM podcasts WHERE author_id = ?', [userId]);

      const [result] = await db.query(
        'DELETE FROM users WHERE id = ?',
        [userId]
      );

      if (result.affectedRows === 0) {
        throw new Error('User not found');
      }

      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  searchUsers: async (searchTerm, limit = 10) => {
    try {
      const query = `
        SELECT 
          id, username, avatar_url, bio,
          (SELECT COUNT(*) FROM podcasts WHERE author_id = users.id) as podcast_count
        FROM users
        WHERE username LIKE ?
        ORDER BY username
        LIMIT ?
      `;
      const [result] = await db.query(query, [`%${searchTerm}%`, limit]);
      return result;
    } catch (error) {
      throw new Error(`Error searching users: ${error.message}`);
    }
  },

  getUserPodcasts: async (userId, limit = 10, offset = 0) => {
    try {
      const query = `
        SELECT 
          p.*,
          c.name as category_name,
          COUNT(e.id) as episode_count
        FROM podcasts p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN episodes e ON p.id = e.podcast_id
        WHERE p.author_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [result] = await db.query(query, [userId, limit, offset]);
      return result;
    } catch (error) {
      throw new Error(`Error fetching user podcasts: ${error.message}`);
    }
  },

  getUserSubscriptions: async (userId, limit = 10, offset = 0) => {
    try {
      const query = `
        SELECT 
          p.*,
          u.username as author_name,
          c.name as category_name,
          COUNT(e.id) as episode_count
        FROM subscriptions s
        JOIN podcasts p ON s.podcast_id = p.id
        JOIN users u ON p.author_id = u.id
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN episodes e ON p.id = e.podcast_id
        WHERE s.user_id = ?
        GROUP BY p.id
        ORDER BY s.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [result] = await db.query(query, [userId, limit, offset]);
      return result;
    } catch (error) {
      throw new Error(`Error fetching user subscriptions: ${error.message}`);
    }
  },

  subscribeToPodcast: async (userId, podcastId) => {
    try {
      const [existingSub] = await db.query(
        'SELECT id FROM subscriptions WHERE user_id = ? AND podcast_id = ? LIMIT 1',
        [userId, podcastId]
      );

      if (existingSub.length > 0) {
        throw new Error('Already subscribed to this podcast');
      }

      await db.query(
        'INSERT INTO subscriptions (user_id, podcast_id, created_at) VALUES (?, ?, NOW())',
        [userId, podcastId]
      );

      return true;
    } catch (error) {
      throw new Error(`Error subscribing to podcast: ${error.message}`);
    }
  },

  unsubscribeFromPodcast: async (userId, podcastId) => {
    try {
      const [result] = await db.query(
        'DELETE FROM subscriptions WHERE user_id = ? AND podcast_id = ?',
        [userId, podcastId]
      );

      if (result.affectedRows === 0) {
        throw new Error('Subscription not found');
      }

      return true;
    } catch (error) {
      throw new Error(`Error unsubscribing from podcast: ${error.message}`);
    }
  }
};

module.exports = usersController;
