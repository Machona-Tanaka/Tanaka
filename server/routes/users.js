const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/:id', usersController.getUserById);

// Authenticated routes
router.put('/:id', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);
router.post('/:id/change-password', authMiddleware, usersController.changePassword);
router.post('/:userId/subscribe/:podcastId', authMiddleware, usersController.subscribeToPodcast);
router.delete('/:userId/subscribe/:podcastId', authMiddleware, usersController.unsubscribeFromPodcast);

module.exports = router;