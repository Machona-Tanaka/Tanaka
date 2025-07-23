import React, { useState } from 'react';
import { FaSearch, FaBookmark, FaRegBookmark, FaShare, FaClock, FaCalendarAlt } from 'react-icons/fa';
import './ArticleDiscovery.css';

const ArticleDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('latest');
  const [savedArticles, setSavedArticles] = useState([]);

  // Mock data for top 5 articles
  const topArticles = [
    {
      id: 1,
      title: "The Future of Content Creation in the AI Era",
      author: "Sarah Johnson",
      excerpt: "Exploring how artificial intelligence is transforming the way we create and consume digital content...",
      image: "https://via.placeholder.com/800x450",
      readTime: "8 min",
      date: "Jun 15, 2023",
      category: "Technology",
      isSaved: false
    },
    {
      id: 2,
      title: "Sustainable Business Practices That Actually Work",
      author: "Michael Chen",
      excerpt: "Real-world examples of companies reducing their environmental impact while improving profitability...",
      image: "https://via.placeholder.com/800x450",
      readTime: "6 min",
      date: "Jun 14, 2023",
      category: "Business",
      isSaved: true
    },
    {
      id: 3,
      title: "Mental Health Strategies for Remote Workers",
      author: "David Wilson",
      excerpt: "Practical tips to maintain wellbeing when your home becomes your office...",
      image: "https://via.placeholder.com/800x450",
      readTime: "5 min",
      date: "Jun 13, 2023",
      category: "Health",
      isSaved: false
    },
    {
      id: 4,
      title: "The Evolution of Web Design: 2023 Trends",
      author: "Emily Rodriguez",
      excerpt: "From neumorphism to scroll-triggered animations, discover what's shaping modern web experiences...",
      image: "https://via.placeholder.com/800x450",
      readTime: "7 min",
      date: "Jun 12, 2023",
      category: "Design",
      isSaved: false
    },
    {
      id: 5,
      title: "Building a Personal Brand on Social Media",
      author: "James Peterson",
      excerpt: "A step-by-step guide to establishing your professional presence online...",
      image: "https://via.placeholder.com/800x450",
      readTime: "9 min",
      date: "Jun 11, 2023",
      category: "Marketing",
      isSaved: false
    }
  ];

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Research: The Impact of Short-Form Content",
      type: "research",
      date: "Jun 10, 2023"
    },
    {
      id: 7,
      title: "Upcoming Webinar: Content Strategy for 2024",
      type: "event",
      date: "Jun 9, 2023"
    },
    {
      id: 8,
      title: "Download Our Free Guide to SEO Best Practices",
      type: "resource",
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
            title: `"${searchQuery}" in Modern Business`,
            author: "Various Experts",
            excerpt: `A comprehensive look at how ${searchQuery} is affecting industries across the globe...`,
            image: "https://via.placeholder.com/800x450",
            readTime: "10 min",
            date: "2023",
            category: "Search Results",
            isSaved: false
          },
          {
            id: 102,
            title: `The Complete Guide to ${searchQuery}`,
            author: "Research Team",
            excerpt: `Everything you need to know about implementing ${searchQuery} in your organization...`,
            image: "https://via.placeholder.com/800x450",
            readTime: "12 min",
            date: "Jun 5, 2023",
            category: "Guide",
            isSaved: false
          },
          {
            id: 103,
            title: `${searchQuery}: Case Studies and Examples`,
            author: "Industry Analysts",
            excerpt: `Real-world applications of ${searchQuery} with measurable results...`,
            image: "https://via.placeholder.com/800x450",
            readTime: "8 min",
            date: "May 28, 2023",
            category: "Analysis",
            isSaved: false
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

  const toggleSaveArticle = (articleId) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  return (
    <div className="article-discovery">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover Insightful Articles</h1>
        <p>Stay informed with the latest trends, research, and expert opinions</p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles, authors, or topics..."
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
            <span>More Filters</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Articles Display */}
        {isSearching ? (
          <div className="search-results">
            <h2 className="section-title">
              Search Results for: <span className="query">"{searchQuery}"</span>
            </h2>
            <div className="articles-grid list-view">
              {searchResults.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="category">{article.category}</span>
                      <span className="read-time"><FaClock /> {article.readTime}</span>
                      <span className="date"><FaCalendarAlt /> {article.date}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p className="excerpt">{article.excerpt}</p>
                    <div className="article-footer">
                      <span className="author">By {article.author}</span>
                      <div className="article-actions">
                        <button 
                          className={`save-button ${savedArticles.includes(article.id) ? 'saved' : ''}`}
                          onClick={() => toggleSaveArticle(article.id)}
                        >
                          {savedArticles.includes(article.id) ? <FaBookmark /> : <FaRegBookmark />}
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
          <div className="top-articles">
            <h2 className="section-title">Top 5 Latest Articles</h2>
            <div className="articles-grid card-view">
              {topArticles.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <div className="article-badge">
                      {article.isSaved && <span className="saved-badge">Saved</span>}
                      <span className="category-badge">{article.category}</span>
                    </div>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="read-time"><FaClock /> {article.readTime}</span>
                      <span className="date"><FaCalendarAlt /> {article.date}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p className="excerpt">{article.excerpt}</p>
                    <div className="article-footer">
                      <span className="author">By {article.author}</span>
                      <div className="article-actions">
                        <button 
                          className={`save-button ${article.isSaved ? 'saved' : ''}`}
                          onClick={() => toggleSaveArticle(article.id)}
                        >
                          {article.isSaved ? <FaBookmark /> : <FaRegBookmark />}
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
                    {update.type === 'research' && 'New Research'}
                    {update.type === 'event' && 'Upcoming Event'}
                    {update.type === 'resource' && 'Free Resource'}
                  </span>
                  <h3>{update.title}</h3>
                  <span className="update-date">{update.date}</span>
                  <button className="update-button">
                    {update.type === 'research' && 'Read Study'}
                    {update.type === 'event' && 'Register Now'}
                    {update.type === 'resource' && 'Download'}
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

export default ArticleDiscovery;