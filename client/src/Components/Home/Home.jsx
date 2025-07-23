import React from 'react'
import { FaHeadphones, FaMicrophone, FaPodcast } from 'react-icons/fa';
import './Home.css'

const Home = () => {



    
  return (
    <div><title>xy developpers</title>
       
       {/* <!-- Add this section right after the navbar --> */}
        <section className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-text">
                    <h1>Welcome to <span className="highlight">PodMyth</span></h1>
                    <p className="tagline">Your gateway to captivating stories, insightful discussions, and audio adventures</p>
                    <div className="welcome-buttons">
                        <a href="#latest" className="btn btn-primary">Explore Podcasts</a>
                        <a href="#" className="btn btn-secondary">Join Our Community</a>
                    </div>
                </div>
                <div className="welcome-image">
                    <img src="https://via.placeholder.com/600x400" alt="People enjoying podcasts" className="main-image"/>
                    <div className="floating-elements">
        
                        <div className="floating-elements">
                            <div className="floating-icon" style={{ "--delay": "0s" }}>
                                <FaHeadphones />
                            </div>
                            <div className="floating-icon" style={{ "--delay": "0.5s" }}>
                                <FaMicrophone />
                            </div>
                            <div className="floating-icon" style={{ "--delay": "1s" }}>
                                <FaPodcast />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <i className="fas fa-chevron-down"></i>
            </div>
        </section>
          {/* <!-- Latest Podcasts --> */}
        <section id="latest" className="section latest-podcasts">
            <div className="section-header">
                <h2>Latest Episodes</h2>
                <a href="#" className="view-all">View All</a>
            </div>
            <div className="podcast-grid">
                {/* <!-- Podcast Card 1 --> */}
                <div className="podcast-card">
                    <div className="podcast-image">
                        <img src="https://via.placeholder.com/300x300" alt="Podcast Cover"/>
                        <div className="play-button">
                            <i className="fas fa-play"></i>
                        </div>
                    </div>
                    <div className="podcast-info">
                        <span className="episode-number">Episode 42</span>
                        <h3>The Future of Audio Storytelling</h3>
                        <p className="podcast-description">Exploring new narrative techniques in podcasting with industry leaders...</p>
                        <div className="podcast-meta">
                            <span className="duration"><i className="far fa-clock"></i> 58 min</span>
                            <span className="date"><i className="far fa-calendar-alt"></i> Jun 15, 2023</span>
                        </div>
                    </div>
                </div>
              {/*                 
                <!-- Repeat for 3 more podcast cards -->
                <!-- ... --> 
              */}
            </div>
        </section>

        {/* <!-- Podcast Merch --> */}
        <section className="section pod-merch">
            <div className="section-header">
                <h2>PodMerch</h2>
                <a href="#" className="view-all">Shop All</a>
            </div>
            <div className="merch-grid">
                {/* <!-- Merch Item 1 --> */}
                <div className="merch-card">
                    <div className="merch-image">
                        <img src="https://via.placeholder.com/300x300" alt="Merch Item"/>
                        <div className="merch-badge">New</div>
                    </div>
                    <div className="merch-info">
                        <h3>Limited Edition T-Shirt</h3>
                        <div className="merch-price">$29.99</div>
                        <button className="btn btn-small">Add to Cart</button>
                    </div>
                </div>
                
                {/* <!-- Repeat for 3 more merch items -->
                <!-- ... --> */}
            </div>
        </section>

        {/* <!-- Podcast Articles --> */}
        <section className="section pod-articles">
            <div className="section-header">
                <h2>PodArticles</h2>
                <a href="#" className="view-all">Read All</a>
            </div>
            <div className="articles-grid">
                {/* <!-- Article 1 --> */}
                <div className="article-card">
                    <div className="article-image">
                        <img src="https://via.placeholder.com/400x225" alt="Article Image"/>
                    </div>
                    <div className="article-info">
                        <span className="category">Industry News</span>
                        <h3>How Podcasts Are Changing Media Consumption</h3>
                        <p className="excerpt">An in-depth look at the shifting patterns of media consumption and the rise of audio content...</p>
                        <div className="article-meta">
                            <span className="author">By Jane Doe</span>
                            <span className="read-time">5 min read</span>
                        </div>
                    </div>
                </div>
                
                {/* <!-- Repeat for 2 more articles -->
                <!-- ... --> */}
            </div>
        </section>

        {/* <!-- Podcast Guides --> */}
        <section className="section pod-guides">
            <div className="section-header">
                <h2>PodGuides</h2>
                <a href="#" className="view-all">See All Guides</a>
            </div>
            <div className="guides-grid">
                {/* <!-- Guide 1 --> */}
                <div className="guide-card">
                    <div className="guide-icon">
                        <i className="fas fa-microphone-alt"></i>
                    </div>
                    <h3>Starting Your Podcast</h3>
                    <p>A comprehensive guide to launching your first podcast from equipment to distribution.</p>
                    <a href="#" className="btn btn-outline">Read Guide</a>
                </div>
                
                {/* <!-- Repeat for 3 more guides -->
                <!-- ... --> */}
            </div>
        </section>

        {/* <!-- Newsletter --> */}
        <section className="newsletter">
            <div className="newsletter-content">
                <h2>Stay Updated</h2>
                <p>Subscribe to our newsletter for the latest episodes, articles, and merch drops</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Your email address" required/>
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </section>



    </div>
  )
}

export default Home
