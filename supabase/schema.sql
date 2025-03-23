-- Create tables for the referral code platform

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Referral codes table
CREATE TABLE referral_codes (
  id SERIAL PRIMARY KEY,
  app_name VARCHAR(100) NOT NULL,
  code VARCHAR(100) NOT NULL,
  description TEXT,
  url VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  user_benefit TEXT,
  referrer_benefit TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_referral_codes_category_id ON referral_codes(category_id);
CREATE INDEX idx_referral_codes_app_name ON referral_codes(app_name);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Finance', 'finance', 'Banking, investment, and financial service apps'),
('Food Delivery', 'food-delivery', 'Food and grocery delivery services'),
('Ride Sharing', 'ride-sharing', 'Ride sharing and transportation services'),
('Shopping', 'shopping', 'Online shopping and retail services'),
('Travel', 'travel', 'Hotels, flights, and vacation rentals'),
('Entertainment', 'entertainment', 'Streaming services and entertainment apps');

-- Insert sample referral codes
INSERT INTO referral_codes (app_name, code, description, url, category_id, user_benefit, referrer_benefit) VALUES
('Uber', 'UBER123', 'Ride sharing service available worldwide', 'https://uber.com', 3, '$5 off your first ride', '$5 credit for referrer'),
('DoorDash', 'DASH50', 'Food delivery from your favorite restaurants', 'https://doordash.com', 2, '$15 off your first order', '$10 credit for referrer'),
('Airbnb', 'STAY100', 'Book unique accommodations around the world', 'https://airbnb.com', 5, '$50 off your first stay', '$25 credit for referrer'),
('Robinhood', 'INVEST21', 'Commission-free investing app', 'https://robinhood.com', 1, 'Free stock worth $5-$200', 'Free stock for referrer'),
('Netflix', 'STREAM30', 'Streaming service for movies and TV shows', 'https://netflix.com', 6, '30 days free trial', 'No referrer benefit'),
('Amazon', 'PRIME50', 'Online shopping with fast delivery', 'https://amazon.com', 4, '$10 off your first order', '$10 credit for referrer'),
('Lyft', 'LYFT25', 'Ride sharing alternative to Uber', 'https://lyft.com', 3, '$5 off each of your first 5 rides', '$10 credit for referrer'),
('Instacart', 'GROCERY20', 'Grocery delivery from local stores', 'https://instacart.com', 2, '$20 off your first order', '$10 credit for referrer'),
('Booking.com', 'BOOK10', 'Hotel and accommodation booking service', 'https://booking.com', 5, '10% cashback on your first booking', '$25 credit for referrer'),
('Coinbase', 'CRYPTO10', 'Cryptocurrency exchange platform', 'https://coinbase.com', 1, '$10 in Bitcoin with $100 purchase', '$10 in Bitcoin for referrer'),
('Disney+', 'DISNEY7', 'Streaming service for Disney content', 'https://disneyplus.com', 6, '7 days free trial', 'No referrer benefit'),
('Etsy', 'CRAFT15', 'Marketplace for handmade and vintage items', 'https://etsy.com', 4, '15% off your first purchase', 'No referrer benefit');
