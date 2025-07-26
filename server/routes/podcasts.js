const express = require('express');
const router = express.Router();
const podcastsController = require('../controllers/podcastsController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, podcastsController.createPodcast);
router.get('/', podcastsController.getAllPodcasts);
router.get('/search', podcastsController.searchPodcasts);
router.get('/:id', podcastsController.getPodcastById);

module.exports = router;