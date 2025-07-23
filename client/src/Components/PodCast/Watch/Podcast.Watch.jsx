import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import './PodcastPlayer.css';

const PodcastPlayer = () => {
  // video id from URL params
  const { podcastId } = useParams();
  
  let Data = fetchPodcastData(podcastId); // Fetch podcast data based on ID



  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Comments and likes state
  const [comments, setComments] = useState([
    { id: 1, user: 'VideoFan123', text: 'The video quality is amazing!', time: '2 hours ago', likes: 12, isLiked: false },
    { id: 2, user: 'ContentCreator', text: 'Great discussion topics in this episode', time: '1 day ago', likes: 8, isLiked: true },
    { id: 3, user: 'MediaEnthusiast', text: 'The guest was fantastic!', time: '3 days ago', likes: 15, isLiked: false }
  ]);
  const [newComment, setNewComment] = useState('');
  const [totalLikes, setTotalLikes] = useState(256);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(true);

  // Recommended podcasts
  const recommendedPodcasts = Data; // This would typically be fetched from an API

  // Current podcast data
  const currentPodcast = {
    id: 100,
    title: 'Mastering Video Podcast Production',
    host: 'Alex Johnson',
    description: 'In this episode, we dive deep into professional video podcast production techniques with award-winning producer Sarah Miller. Learn about lighting, sound, and camera setups that will elevate your video podcast quality.',
    image: 'https://via.placeholder.com/800x450',
    videoSrc: 'https://example.com/video-podcast.mp4',
    date: 'June 18, 2023',
    category: 'Production',
    views: '24.5K'
  };

  // Video player controls
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume == 0);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Comments and likes
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: 'CurrentUser',
        text: newComment,
        time: 'Just now',
        likes: 0,
        isLiked: false
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const toggleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const toggleLikePodcast = () => {
    setIsLiked(!isLiked);
    setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="video-podcast-container">
      {/* Main content (90% width) */}
      <div className="main-content">
        {/* Podcast header */}
        <div className="podcast-header">
          <h1>{currentPodcast.title}</h1>
          <div className="podcast-meta">
            <span className="host">Hosted by {currentPodcast.host}</span>
            <span className="date">{currentPodcast.date}</span>
            <span className="category">{currentPodcast.category}</span>
            <span className="views">{currentPodcast.views} views</span>
          </div>
        </div>

        {/* Video player */}
        <div className="video-player-container" ref={playerContainerRef}>
          <video
            ref={videoRef}
            src={currentPodcast.videoSrc}
            poster={currentPodcast.image}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Video controls */}
          <div className={`video-controls ${isPlaying ? 'hide-controls' : ''}`}>
            <div className="progress-container">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="progress-bar"
              />
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls-bottom">
              <div className="left-controls">
                <button className="control-button play-pause" onClick={togglePlay}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <div className="volume-control">
                  <button className="control-button mute" onClick={toggleMute}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-bar"
                  />
                </div>
              </div>

              <div className="right-controls">
                <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={toggleLikePodcast}>
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                  <span>{totalLikes}</span>
                </button>
                <button className="control-button" onClick={() => setShowComments(!showComments)}>
                  <FaComment />
                </button>
                <button className="control-button">
                  <FaShare />
                </button>
                <button className="control-button" onClick={toggleFullscreen}>
                  <FaEllipsisH />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Podcast description */}
        <div className="podcast-description">
          <h2>About This Episode</h2>
          <p>{currentPodcast.description}</p>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="comments-section">
            <h2>Comments ({comments.length})</h2>
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-time">{comment.time}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <button 
                    className={`comment-like ${comment.isLiked ? 'liked' : ''}`}
                    onClick={() => toggleLikeComment(comment.id)}
                  >
                    <FaHeart /> {comment.likes}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar (10% width) */}
      <div className="recommendations-sidebar">
        <h3>Recommended Videos</h3>
        <div className="recommended-podcasts">
          {recommendedPodcasts.map((podcast) => (
            <div key={podcast.id} className="recommended-podcast">
              <div className="thumbnail-container">
                <img src={podcast.image} alt={podcast.title} />
                <span className="duration">{podcast.duration}</span>
              </div>
              <div className="podcast-info">
                <h4>{podcast.title}</h4>
                <span className="views">{podcast.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


function fetchPodcastData(podcastId) {
  // This function would typically fetch podcast data from an API
  // For this example, we are using hardcoded data
  return [
    { id: podcastId, title: 'The Future of Video Podcasting', image: 'https://via.placeholder.com/150x150', duration: '42 min', views: '12K' },
    { id: 102, title: 'Cinematic Storytelling', image: 'https://via.placeholder.com/150x150', duration: '35 min', views: '8.5K' },
    { id: 103, title: 'Behind the Scenes: Production', image: 'https://via.placeholder.com/150x150', duration: '58 min', views: '15.2K' },
    { id: 104, title: 'Lighting Techniques', image: 'https://via.placeholder.com/150x150', duration: '45 min', views: '9.7K' }
  ];
}


export default PodcastPlayer;