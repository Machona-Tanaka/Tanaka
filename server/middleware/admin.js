const db = require('../config/db');

module.exports = async (req, res, next) => {
  try {
    // Assuming your users table has an 'is_admin' column
    const [user] = await db.query(
      'SELECT is_admin FROM users WHERE id = ? LIMIT 1',
      [req.user.userId]
    );
    
    if (!user.length || !user[0].is_admin) {
      return res.status(403).json({ 
        error: 'Forbidden',
        details: 'Admin privileges required' 
      });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};