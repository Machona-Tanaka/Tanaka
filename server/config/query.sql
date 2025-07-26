CREATE DATABASE podcast_db;
USE podcast_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

-- Podcasts table
CREATE TABLE podcasts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(255),
  author_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Episodes table
CREATE TABLE episodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  podcast_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_url VARCHAR(255) NOT NULL,
  duration INT, -- in seconds
  publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (podcast_id) REFERENCES podcasts(id) ON DELETE CASCADE
);

-- Full-text index for search
ALTER TABLE podcasts ADD FULLTEXT INDEX idx_search (title, description);