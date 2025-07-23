import React, { useState } from 'react';
import { FaSearch, FaPlay, FaBook, FaDownload, FaRegBookmark, FaBookmark, FaShare } from 'react-icons/fa';
import './PodGuideDiscovery.css';

const PodGuideDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedGuides, setSavedGuides] = useState([]);

  // Mock data for top 5 podguides
  const topPodGuides = [
    {
      id: 1,
      title: "The Ultimate Guide to Podcast Equipment",
      author: "Audio Expert Team",
      description: "Complete breakdown of microphones, mixers, and accessories for every budget level...",
      image: "https://via.placeholder.com/400x225",
      format: "PDF",
      pages: 42,
      downloads: "12.5K",
      category: "Equipment",
      isNew: true
    },
    {
      id: 2,
      title: "Editing Podcasts Like a Pro",
      author: "Studio Masters",
      description: "Step-by-step techniques for professional podcast editing in various software...",
      image: "https://via.placeholder.com/400x225",
      format: "Video",
      duration: "1h 25m",
      downloads: "8.7K",
      category: "Production",
      isNew: false
    },
    {
      id: 3,
      title: "Growing Your Podcast Audience",
      author: "Marketing Gurus",
      description: "Proven strategies to increase your listener base and engagement metrics...",
      image: "https://via.placeholder.com/400x225",
      format: "Interactive",
      tools: 5,
      downloads: "15.2K",
      category: "Marketing",
      isNew: true
    },
    {
      id: 4,
      title: "Monetization Strategies for Podcasters",
      author: "Industry Insiders",
      description: "Comprehensive look at sponsorship, subscriptions, and other revenue streams...",
      image: "https://via.placeholder.com/400x225",
      format: "PDF",
      pages: 36,
      downloads: "9.3K",
      category: "Business",
      isNew: false
    },
    {
      id: 5,
      title: "Interview Techniques for Podcast Hosts",
      author: "Conversation Experts",
      description: "How to conduct engaging interviews that keep listeners coming back...",
      image: "https://via.placeholder.com/400x225",
      format: "Audio Guide",
      duration: "45m",
      downloads: "6.8K",
      category: "Hosting",
      isNew: false
    }
  ];

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Video Series: Behind the Scenes of Top Podcasts",
      type: "series",
      date: "Jun 10, 2023"
    },
    {
      id: 7,
      title: "Community Challenge: 30 Days to Better Podcasting",
      type: "challenge",
      date: "Jun 9, 2023"
    },
    {
      id: 8,
      title: "Free Webinar: Podcast Analytics Explained",
      type: "webinar",
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
            title: `Complete ${searchQuery} Handbook`,
            author: "Expert Team",
            description: `Everything you need to know about ${searchQuery} for podcast creators...`,
            image: "https://via.placeholder.com/400x225",
            format: "PDF",
            pages: 28,
            downloads: "New",
            category: "Search Results",
            isNew: true
          },
          {
            id: 102,
            title: `${searchQuery} Masterclass`,
            author: "Industry Leaders",
            description: `Advanced techniques and insider knowledge about ${searchQuery}...`,
            image: "https://via.placeholder.com/400x225",
            format: "Video Series",
            duration: "2h 15m",
            downloads: "3.2K",
            category: "Education",
            isNew: false
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

  const toggleSaveGuide = (guideId) => {
    if (savedGuides.includes(guideId)) {
      setSavedGuides(savedGuides.filter(id => id !== guideId));
    } else {
      setSavedGuides([...savedGuides, guideId]);
    }
  };

  const getFormatIcon = (format) => {
    switch(format) {
      case 'PDF': return <FaBook />;
      case 'Video': return <FaPlay />;
      case 'Audio Guide': return <FaPlay />;
      case 'Interactive': return <FaDownload />;
      default: return <FaBook />;
    }
  };

  return (
    <div className="podguide-discovery">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>PodGuide Library</h1>
        <p>Expert resources to help you create, grow, and monetize your podcast</p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search podguides by topic, format, or author..."
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
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* PodGuides Display */}
        {isSearching ? (
          <div className="search-results">
            <h2 className="section-title">
              Search Results for: <span className="query">"{searchQuery}"</span>
            </h2>
            <div className="podguides-grid list-view">
              {searchResults.map((guide) => (
                <div key={guide.id} className="podguide-card">
                  <div className="guide-image">
                    <img src={guide.image} alt={guide.title} />
                    <div className="guide-badge">
                      {guide.isNew && <span className="new-badge">New</span>}
                      <span className="format-badge">
                        {getFormatIcon(guide.format)}
                        {guide.format}
                      </span>
                    </div>
                  </div>
                  <div className="guide-content">
                    <span className="category">{guide.category}</span>
                    <h3>{guide.title}</h3>
                    <p className="description">{guide.description}</p>
                    <div className="guide-meta">
                      <span className="author">By {guide.author}</span>
                      <span className="downloads">{guide.downloads} downloads</span>
                    </div>
                    <div className="guide-footer">
                      {guide.format === 'PDF' && <span>{guide.pages} pages</span>}
                      {guide.format === 'Video' && <span>{guide.duration}</span>}
                      {guide.format === 'Audio Guide' && <span>{guide.duration}</span>}
                      {guide.format === 'Interactive' && <span>{guide.tools} interactive tools</span>}
                      <div className="guide-actions">
                        <button 
                          className={`save-button ${savedGuides.includes(guide.id) ? 'saved' : ''}`}
                          onClick={() => toggleSaveGuide(guide.id)}
                        >
                          {savedGuides.includes(guide.id) ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                        <button className="share-button">
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="top-podguides">
            <h2 className="section-title">Top 5 Latest PodGuides</h2>
            <div className="podguides-grid card-view">
              {topPodGuides.map((guide) => (
                <div key={guide.id} className="podguide-card">
                  <div className="guide-image">
                    <img src={guide.image} alt={guide.title} />
                    <div className="guide-badge">
                      {guide.isNew && <span className="new-badge">New</span>}
                      <span className="format-badge">
                        {getFormatIcon(guide.format)}
                        {guide.format}
                      </span>
                    </div>
                  </div>
                  <div className="guide-content">
                    <span className="category">{guide.category}</span>
                    <h3>{guide.title}</h3>
                    <p className="description">{guide.description}</p>
                    <div className="guide-meta">
                      <span className="author">By {guide.author}</span>
                      <span className="downloads">{guide.downloads} downloads</span>
                    </div>
                    <div className="guide-footer">
                      {guide.format === 'PDF' && <span>{guide.pages} pages</span>}
                      {guide.format === 'Video' && <span>{guide.duration}</span>}
                      {guide.format === 'Audio Guide' && <span>{guide.duration}</span>}
                      {guide.format === 'Interactive' && <span>{guide.tools} interactive tools</span>}
                      <div className="guide-actions">
                        <button 
                          className={`save-button ${savedGuides.includes(guide.id) ? 'saved' : ''}`}
                          onClick={() => toggleSaveGuide(guide.id)}
                        >
                          {savedGuides.includes(guide.id) ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                        <button className="share-button">
                          <FaShare />
                        </button>
                      </div>
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
          <div className="updates-grid">
            {otherUpdates.map((update) => (
              <div key={update.id} className={`update-card ${update.type}`}>
                <div className="update-content">
                  <span className="update-type">
                    {update.type === 'series' && 'New Series'}
                    {update.type === 'challenge' && 'Community'}
                    {update.type === 'webinar' && 'Webinar'}
                  </span>
                  <h3>{update.title}</h3>
                  <span className="update-date">{update.date}</span>
                  <button className="update-button">
                    {update.type === 'series' && 'View Series'}
                    {update.type === 'challenge' && 'Join Now'}
                    {update.type === 'webinar' && 'Register'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodGuideDiscovery;