import React, { useState} from 'react';
import { FaSearch, FaPlay, FaClock, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import '../../assets/css/PodcastDiscovery.css';

const Podcast = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('latest');

  // Mock data for top 5 podcasts
  const topPodcasts = [
    {
      id: 1,
      title: "The Future of Audio Storytelling",
      host: "Jane Smith",
      duration: "42 min",
      date: "Jun 15, 2023",
      image: "https://via.placeholder.com/300x300",
      category: "Technology"
    },
    {
      id: 2,
      title: "Mindfulness in the Digital Age",
      host: "Alex Johnson",
      duration: "35 min",
      date: "Jun 14, 2023",
      image: "https://via.placeholder.com/300x300",
      category: "Health"
    },
    {
      id: 3,
      title: "Startup Success Stories",
      host: "Michael Chen",
      duration: "58 min",
      date: "Jun 13, 2023",
      image: "https://via.placeholder.com/300x300",
      category: "Business"
    },
    {
      id: 4,
      title: "Climate Change Solutions",
      host: "Sarah Williams",
      duration: "45 min",
      date: "Jun 12, 2023",
      image: "https://via.placeholder.com/300x300",
      category: "Science"
    },
    {
      id: 5,
      title: "The History of Jazz",
      host: "David Brown",
      duration: "52 min",
      date: "Jun 11, 2023",
      image: "https://via.placeholder.com/300x300",
      category: "Music"
    }
  ];

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Merch Drop: Summer Collection",
      type: "merch",
      date: "Jun 10, 2023"
    },
    {
      id: 7,
      title: "Interview with Award-Winning Podcaster",
      type: "article",
      date: "Jun 9, 2023"
    },
    {
      id: 8,
      title: "How to Start Your Own Podcast - Free Guide",
      type: "guide",
      date: "Jun 8, 2023"
    }
  ];

  // Mock search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setSearchResults([
          {
            id: 101,
            title: `Results for "${searchQuery}"`,
            host: "Various",
            duration: "Various",
            date: "2023",
            image: "https://via.placeholder.com/300x300",
            category: "Search"
          },
          {
            id: 102,
            title: `Deep Dive: ${searchQuery}`,
            host: "Expert Panel",
            duration: "64 min",
            date: "Jun 5, 2023",
            image: "https://via.placeholder.com/300x300",
            category: "Analysis"
          },
          {
            id: 103,
            title: `The Truth About ${searchQuery}`,
            host: "Investigative Team",
            duration: "47 min",
            date: "May 28, 2023",
            image: "https://via.placeholder.com/300x300",
            category: "Investigation"
          }
        ]);
      }, 500);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="podcast-discovery">
      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search podcasts, episodes, or hosts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={clearSearch}>
                &times;
              </button>
            )}
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="filter-options">
          <button
            className={`filter-button ${activeFilter === 'latest' ? 'active' : ''}`}
            onClick={() => setActiveFilter('latest')}
          >
            Latest
          </button>
          <button
            className={`filter-button ${activeFilter === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveFilter('popular')}
          >
            Popular
          </button>
          <button
            className={`filter-button ${activeFilter === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('trending')}
          >
            Trending
          </button>
          <div className="advanced-filter">
            <FaFilter />
            <span>Filters</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Podcast Display */}
        {isSearching ? (
          <div className="search-results">
            <h2 className="section-title">Search Results</h2>
            <div className="podcast-grid">
              {searchResults.map((podcast) => (
                <div key={podcast.id} className="podcast-card">
                  <div className="podcast-image">
                    <img src={podcast.image} alt={podcast.title} />
                    <div className="play-button">
                      <FaPlay />
                    </div>
                  </div>
                  <div className="podcast-info">
                    <span className="category">{podcast.category}</span>
                    <h3>{podcast.title}</h3>
                    <p className="host">Hosted by {podcast.host}</p>
                    <div className="podcast-meta">
                      <span><FaClock /> {podcast.duration}</span>
                      <span><FaCalendarAlt /> {podcast.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="top-podcasts">
            <h2 className="section-title">Top 5 Latest Podcasts</h2>
            <div className="podcast-grid">
              {topPodcasts.map((podcast) => (
                <div key={podcast.id} className="podcast-card">
                  <div className="podcast-image">
                    <img src={podcast.image} alt={podcast.title} />
                    <div className="play-button">
                      <FaPlay />
                    </div>
                  </div>
                  <div className="podcast-info">
                    <span className="category">{podcast.category}</span>
                    <h3>{podcast.title}</h3>
                    <p className="host">Hosted by {podcast.host}</p>
                    <div className="podcast-meta">
                      <span><FaClock /> {podcast.duration}</span>
                      <span><FaCalendarAlt /> {podcast.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Updates Section */}
        <div className="other-updates">
          <h2 className="section-title">Other Updates</h2>
          <div className="updates-list">
            {otherUpdates.map((update) => (
              <div key={update.id} className="update-item">
                <div className={`update-icon ${update.type}`}>
                  {update.type === 'merch' && '🛍️'}
                  {update.type === 'article' && '📰'}
                  {update.type === 'guide' && '📚'}
                </div>
                <div className="update-info">
                  <h3>{update.title}</h3>
                  <span className="update-date">{update.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;