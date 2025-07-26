const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin'); // Assuming you have admin middleware
const { check } = require('express-validator');

// Create category (admin only)
router.post('/', 
  authMiddleware,
  adminMiddleware,
  [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('description').optional().trim()
  ],
  categoriesController.createCategory
);

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get single category
router.get('/:id', categoriesController.getCategoryById);

// Update category (admin only)
router.put('/:id', 
  authMiddleware,
  adminMiddleware,
  [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('description').optional().trim()
  ],
  categoriesController.updateCategory
);

// Delete category (admin only)
router.delete('/:id', 
  authMiddleware,
  adminMiddleware,
  categoriesController.deleteCategory
);

// Get podcasts by category
router.get('/:id/podcasts', categoriesController.getPodcastsByCategory);

module.exports = router;