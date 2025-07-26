import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaHeart, FaStar, FaRegStar, FaFilter } from 'react-icons/fa';
import '../../assets/css/ProductDiscovery.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('latest');

  // Mock data for top 5 products
  const topProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      price: 299.99,
      discount: 349.99,
      rating: 4.5,
      image: "https://via.placeholder.com/300x300",
      category: "Audio",
      isNew: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      discount: 249.99,
      rating: 4.2,
      image: "https://via.placeholder.com/300x300",
      category: "Wearables",
      isNew: true
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      discount: 39.99,
      rating: 4.0,
      image: "https://via.placeholder.com/300x300",
      category: "Apparel",
      isNew: false
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      discount: 34.99,
      rating: 4.7,
      image: "https://via.placeholder.com/300x300",
      category: "Accessories",
      isNew: false
    },
    {
      id: 5,
      name: "Bluetooth Portable Speaker",
      price: 89.99,
      discount: 109.99,
      rating: 4.3,
      image: "https://via.placeholder.com/300x300",
      category: "Audio",
      isNew: true
    }
  ];

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Collection: Summer Essentials",
      type: "collection",
      date: "Jun 10, 2023"
    },
    {
      id: 7,
      title: "Limited Time Offer: 20% Off All Audio",
      type: "sale",
      date: "Jun 9, 2023"
    },
    {
      id: 8,
      title: "How to Choose the Right Headphones - Guide",
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
            name: `Premium ${searchQuery} Pro`,
            price: 149.99,
            discount: 179.99,
            rating: 4.4,
            image: "https://via.placeholder.com/300x300",
            category: "Search Results",
            isNew: true
          },
          {
            id: 102,
            name: `Wireless ${searchQuery} Kit`,
            price: 79.99,
            discount: 99.99,
            rating: 3.9,
            image: "https://via.placeholder.com/300x300",
            category: "Search Results",
            isNew: false
          },
          {
            id: 103,
            name: `${searchQuery} Travel Case`,
            price: 19.99,
            discount: 24.99,
            rating: 4.1,
            image: "https://via.placeholder.com/300x300",
            category: "Accessories",
            isNew: true
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

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="star filled" />
        ) : (
          <FaRegStar key={i} className="star" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="product-discovery">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Shop the latest and greatest from our collection</p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products, categories, or brands..."
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
            className={`filter-button ${activeFilter === 'discount' ? 'active' : ''}`}
            onClick={() => setActiveFilter('discount')}
          >
            On Discount
          </button>
          <div className="advanced-filter">
            <FaFilter />
            <span>More Filters</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Products Display */}
        {isSearching ? (
          <div className="search-results">
            <h2 className="section-title">
              Search Results for: <span className="query">"{searchQuery}"</span>
            </h2>
            <div className="products-grid minimal">
              {searchResults.map((product) => (
                <div key={product.id} className="product-card minimal">
                  <div className="product-badge">
                    {product.isNew && <span className="new-badge">New</span>}
                    <span className="discount-badge">
                      {Math.round(((product.discount - product.price) / product.discount) * 100)}% Off
                    </span>
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <FaHeart />
                      </button>
                      <button className="action-btn cart">
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="price-container">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      <span className="original-price">${product.discount.toFixed(2)}</span>
                    </div>
                    <div className="rating">{renderStars(product.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="top-products">
            <h2 className="section-title">Top 5 Latest Products</h2>
            <div className="products-grid featured">
              {topProducts.map((product) => (
                <div key={product.id} className="product-card featured">
                  <div className="product-badge">
                    {product.isNew && <span className="new-badge">New</span>}
                    <span className="discount-badge">
                      {Math.round(((product.discount - product.price) / product.discount) * 100)}% Off
                    </span>
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <FaHeart />
                      </button>
                      <button className="action-btn cart">
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="price-container">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      <span className="original-price">${product.discount.toFixed(2)}</span>
                    </div>
                    <div className="rating">{renderStars(product.rating)}</div>
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
                  <h3>{update.title}</h3>
                  <span className="update-date">{update.date}</span>
                  <button className="update-button">
                    {update.type === 'collection' && 'View Collection'}
                    {update.type === 'sale' && 'Shop Sale'}
                    {update.type === 'guide' && 'Read Guide'}
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

export default Products;