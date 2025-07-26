const express = require('express');
const router = express.Router();
const episodesController = require('../controllers/episodesController');
const authMiddleware = require('../middleware/auth');

// Create episode for a podcast
router.post('/podcasts/:podcastId/episodes', authMiddleware, episodesController.createEpisode);

// Get all episodes for a podcast
router.get('/podcasts/:podcastId/episodes', episodesController.getPodcastEpisodes);

// Get single episode
router.get('/episodes/:id', episodesController.getEpisode);

// Update episode
router.put('/episodes/:id', authMiddleware, episodesController.updateEpisode);

// Delete episode
router.delete('/episodes/:id', authMiddleware, episodesController.deleteEpisode);

// Record download
router.post('/episodes/:id/download', episodesController.recordDownload);

module.exports = router;