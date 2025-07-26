const Podcast = require('../models/Podcast');

module.exports = {
  createPodcast: async (req, res) => {
    try {
      const { title, description, cover_image_url, category_id } = req.body;
      const authorId = req.user.userId;

      const podcastId = await Podcast.create({
        title,
        description,
        coverImageUrl: cover_image_url,
        authorId,
        categoryId: category_id
      });

      const podcast = await Podcast.findById(podcastId);
      res.status(201).json(podcast);
    } catch (error) {
      console.error('Create podcast error:', error);
      res.status(500).json({ error: 'Failed to create podcast' });
    }
  },

  getAllPodcasts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Podcast.findAllPaginated(page, limit);
      res.json(result);
    } catch (error) {
      console.error('Get podcasts error:', error);
      res.status(500).json({ error: 'Failed to fetch podcasts' });
    }
  },

  getPodcastById: async (req, res) => {
    try {
      const podcast = await Podcast.findById(req.params.id);
      if (!podcast) {
        return res.status(404).json({ error: 'Podcast not found' });
      }
      res.json(podcast);
    } catch (error) {
      console.error('Get podcast error:', error);
      res.status(500).json({ error: 'Failed to fetch podcast' });
    }
  },

  searchPodcasts: async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query required' });
      }

      const results = await Podcast.search(q);
      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Search failed' });
    }
  }
};