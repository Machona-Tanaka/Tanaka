const Episode = require('../models/Episode');
const Podcast = require('../models/podcast');

module.exports = {
  createEpisode: async (req, res) => {
    try {
      const { podcastId } = req.params;
      const { title, description, audio_url, duration } = req.body;

      // Verify podcast exists and belongs to user
      const podcast = await Podcast.findById(podcastId);
      if (!podcast) {
        return res.status(404).json({ error: 'Podcast not found' });
      }
      if (podcast.author_id !== req.user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const episodeId = await Episode.create({
        podcastId,
        title,
        description,
        audioUrl: audio_url,
        duration
      });

      const episode = await Episode.findById(episodeId);
      res.status(201).json(episode);
    } catch (error) {
      console.error('Create episode error:', error);
      res.status(500).json({ error: 'Failed to create episode' });
    }
  },

  getPodcastEpisodes: async (req, res) => {
    try {
      const { podcastId } = req.params;
      const episodes = await Episode.findByPodcast(podcastId);
      res.json(episodes);
    } catch (error) {
      console.error('Get episodes error:', error);
      res.status(500).json({ error: 'Failed to fetch episodes' });
    }
  },

  getEpisode: async (req, res) => {
    try {
      const { id } = req.params;
      const episode = await Episode.findById(id);
      
      if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
      }

      res.json(episode);
    } catch (error) {
      console.error('Get episode error:', error);
      res.status(500).json({ error: 'Failed to fetch episode' });
    }
  },

  updateEpisode: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, audio_url, duration } = req.body;

      // Verify episode exists and belongs to user
      const episode = await Episode.findById(id);
      if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
      }
      
      const podcast = await Podcast.findById(episode.podcast_id);
      if (podcast.author_id !== req.user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updatedEpisode = await Episode.update(id, {
        title,
        description,
        audioUrl: audio_url,
        duration
      });

      res.json(updatedEpisode);
    } catch (error) {
      console.error('Update episode error:', error);
      res.status(500).json({ error: 'Failed to update episode' });
    }
  },

  deleteEpisode: async (req, res) => {
    try {
      const { id } = req.params;

      // Verify episode exists and belongs to user
      const episode = await Episode.findById(id);
      if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
      }
      
      const podcast = await Podcast.findById(episode.podcast_id);
      if (podcast.author_id !== req.user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await Episode.delete(id);
      res.json({ success: true, message: 'Episode deleted' });
    } catch (error) {
      console.error('Delete episode error:', error);
      res.status(500).json({ error: 'Failed to delete episode' });
    }
  },

  recordDownload: async (req, res) => {
    try {
      const { id } = req.params;
      await Episode.incrementDownloads(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Record download error:', error);
      res.status(500).json({ error: 'Failed to record download' });
    }
  }
};