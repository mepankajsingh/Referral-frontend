-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  logo_url TEXT,
  code TEXT NOT NULL,
  description TEXT NOT NULL,
  terms TEXT,
  user_benefit TEXT NOT NULL,
  referrer_benefit TEXT NOT NULL,
  screenshot_url TEXT,
  url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral_submissions table for pending submissions if it doesn't exist
CREATE TABLE IF NOT EXISTS referral_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  logo_url TEXT,
  code TEXT NOT NULL,
  description TEXT NOT NULL,
  terms TEXT,
  user_benefit TEXT NOT NULL,
  referrer_benefit TEXT NOT NULL,
  screenshot_url TEXT,
  url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  submitter_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'referral_codes_category_id_idx') THEN
    CREATE INDEX referral_codes_category_id_idx ON referral_codes(category_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'referral_submissions_category_id_idx') THEN
    CREATE INDEX referral_submissions_category_id_idx ON referral_submissions(category_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'referral_codes_featured_idx') THEN
    CREATE INDEX referral_codes_featured_idx ON referral_codes(featured);
  END IF;
END $$;

-- Create function to update updated_at timestamp if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_updated_at') THEN
    CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_referral_codes_updated_at') THEN
    CREATE TRIGGER update_referral_codes_updated_at
    BEFORE UPDATE ON referral_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_referral_submissions_updated_at') THEN
    CREATE TRIGGER update_referral_submissions_updated_at
    BEFORE UPDATE ON referral_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert sample data only if categories table is empty
DO $$
DECLARE
  category_count INTEGER;
  referral_count INTEGER;
  finance_id UUID;
  travel_id UUID;
  food_delivery_id UUID;
  shopping_id UUID;
  technology_id UUID;
  entertainment_id UUID;
  transportation_id UUID;
  health_wellness_id UUID;
  education_id UUID;
  other_id UUID;
BEGIN
  -- Check if we already have data
  SELECT COUNT(*) INTO category_count FROM categories;
  SELECT COUNT(*) INTO referral_count FROM referral_codes;
  
  -- Only insert sample data if tables are empty
  IF category_count = 0 THEN
    -- Insert categories
    INSERT INTO categories (name, slug, description) VALUES
    ('Finance', 'finance', 'Banking, investment, and financial services'),
    ('Travel', 'travel', 'Airlines, hotels, and travel booking services'),
    ('Food & Delivery', 'food-delivery', 'Food delivery, meal kits, and restaurant services'),
    ('Shopping', 'shopping', 'Online retailers and marketplaces'),
    ('Technology', 'technology', 'Software, apps, and tech services'),
    ('Entertainment', 'entertainment', 'Streaming services, games, and entertainment'),
    ('Transportation', 'transportation', 'Ride-sharing, car rentals, and transportation services'),
    ('Health & Wellness', 'health-wellness', 'Fitness apps, health services, and wellness products'),
    ('Education', 'education', 'Online courses, learning platforms, and educational tools'),
    ('Other', 'other', 'Miscellaneous services and products');
  END IF;
  
  -- Only insert referral codes if there are none
  IF referral_count = 0 THEN
    -- Get category IDs
    SELECT id INTO finance_id FROM categories WHERE slug = 'finance';
    SELECT id INTO travel_id FROM categories WHERE slug = 'travel';
    SELECT id INTO food_delivery_id FROM categories WHERE slug = 'food-delivery';
    SELECT id INTO shopping_id FROM categories WHERE slug = 'shopping';
    SELECT id INTO technology_id FROM categories WHERE slug = 'technology';
    SELECT id INTO entertainment_id FROM categories WHERE slug = 'entertainment';
    SELECT id INTO transportation_id FROM categories WHERE slug = 'transportation';
    SELECT id INTO health_wellness_id FROM categories WHERE slug = 'health-wellness';
    SELECT id INTO education_id FROM categories WHERE slug = 'education';
    SELECT id INTO other_id FROM categories WHERE slug = 'other';

    -- Insert sample referral codes
    
    -- Finance referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Wise', 'https://wise.com/public-resources/assets/logos/wise/brand_logo.svg', 'REFER123', 'Wise (formerly TransferWise) is a money transfer service allowing private individuals and businesses to send money abroad without hidden charges.', 'New users only. Transfer must be over $200 equivalent.', 'Fee-free first transfer up to $500', '$75 when your friend transfers over $200', 'https://wise.com/invite', TRUE, finance_id),
    
    ('Revolut', 'https://www.revolut.com/favicon/favicon.ico', 'REVFRIEND', 'Revolut is a financial technology company that offers banking services including a prepaid debit card, currency exchange, and peer-to-peer payments.', 'Must sign up and make 3 card transactions.', 'Free card delivery and $10 signup bonus', '$30 for each successful referral', 'https://revolut.com/referral', FALSE, finance_id),
    
    ('Robinhood', 'https://robinhood.com/favicon.ico', 'SHARESTOCK', 'Robinhood is a commission-free stock trading & investing app.', 'New users only. Must link a bank account.', 'Free stock worth between $5-$200', 'Free stock worth between $5-$200', 'https://robinhood.com/signup', FALSE, finance_id);

    -- Travel referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Airbnb', 'https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f.png', 'TRAVEL2023', 'Airbnb is an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.', 'Valid for first-time users only.', '$50 off your first stay of $100 or more', '$25 credit after your friend completes their first stay', 'https://airbnb.com/refer', TRUE, travel_id),
    
    ('Booking.com', 'https://cf.bstatic.com/static/img/favicon/favicon-32x32.png', 'BOOKFRIEND', 'Booking.com is a travel fare aggregator website and travel metasearch engine for lodging reservations.', 'Minimum booking value applies.', '10% back on your booking', '$25 reward after your friend completes their stay', 'https://booking.com/referral', FALSE, travel_id);

    -- Food & Delivery referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('DoorDash', 'https://doordash.com/favicon.ico', 'DASHFREE', 'DoorDash is a food delivery service that connects customers with local restaurants.', 'Valid for first-time users only.', '$15 off your first order of $20 or more', '$10 credit for each friend who places their first order', 'https://doordash.com/refer-a-friend', TRUE, food_delivery_id),
    
    ('HelloFresh', 'https://www.hellofresh.com/favicon.ico', 'FRESH50', 'HelloFresh is a meal kit delivery service that sends pre-portioned ingredients and recipes to subscribers.', 'New customers only.', '50% off your first box + free shipping', '$30 credit for each friend who subscribes', 'https://hellofresh.com/refer', FALSE, food_delivery_id);

    -- Shopping referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Amazon Prime', 'https://amazon.com/favicon.ico', 'PRIMETRIAL', 'Amazon Prime is a paid subscription service offering free shipping, streaming video/music and other benefits.', 'Valid for new Prime members only.', '30-day free trial of Prime', '$10 Amazon credit when your friend signs up for Prime', 'https://amazon.com/prime', TRUE, shopping_id),
    
    ('Rakuten', 'https://www.rakuten.com/favicon.ico', 'CASHBACK30', 'Rakuten (formerly Ebates) is a cash back and shopping rewards company.', 'Must make a qualifying purchase of $30 or more within 90 days.', '$30 bonus after your first qualifying purchase', '$30 for each friend who makes a qualifying purchase', 'https://rakuten.com/referral', FALSE, shopping_id);

    -- Technology referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Dropbox', 'https://www.dropbox.com/static/images/favicon.ico', 'EXTRASPACE', 'Dropbox is a file hosting service that offers cloud storage, file synchronization, and client software.', 'New users only.', '500MB of bonus space', '500MB of bonus space per referral (up to 16GB)', 'https://dropbox.com/referrals', FALSE, technology_id),
    
    ('LastPass', 'https://lastpass.com/favicon.ico', 'SECUREPWD', 'LastPass is a password manager that stores encrypted passwords online.', 'Valid for new premium subscriptions.', '1 month free Premium', '1 month free Premium for each successful referral', 'https://lastpass.com/refer', FALSE, technology_id);

    -- Entertainment referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Spotify', 'https://www.spotify.com/favicon.ico', 'PREMIUM60', 'Spotify is a digital music streaming service with millions of songs, podcasts and videos.', 'New Premium users who haven\'t tried Premium before.', '60 days of Spotify Premium free', '1 month of Spotify Premium for each successful referral', 'https://spotify.com/referral', TRUE, entertainment_id),
    
    ('Disney+', 'https://www.disneyplus.com/favicon.ico', 'DISNEYMAGIC', 'Disney+ is a subscription video on-demand streaming service owned by The Walt Disney Company.', 'New subscribers only.', '7-day free trial', '$10 Disney store credit when your friend subscribes', 'https://disneyplus.com/refer', FALSE, entertainment_id);

    -- Transportation referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Uber', 'https://uber.com/favicon.ico', 'RIDE25', 'Uber is a ride-hailing company offering services that include peer-to-peer ridesharing, food delivery, and a micromobility system with electric bikes and scooters.', 'New users only.', '$5 off each of your first 5 rides', '$5 credit for each friend who takes their first ride', 'https://uber.com/invite', TRUE, transportation_id),
    
    ('Lyft', 'https://lyft.com/favicon.ico', 'LYFTNOW', 'Lyft is a ride-sharing company operating in the United States and Canada.', 'New users only.', '$15 in ride credits', '$5 credit for each friend who takes their first ride', 'https://lyft.com/invite', FALSE, transportation_id);

    -- Health & Wellness referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Headspace', 'https://www.headspace.com/favicon.ico', 'MEDITATE', 'Headspace is a meditation and mindfulness app designed to help you be more present and live a healthier, happier life.', 'New subscribers only.', '14-day free trial + 30% off your first year', '1 month free for each friend who subscribes', 'https://headspace.com/referral', FALSE, health_wellness_id),
    
    ('Fitbit Premium', 'https://www.fitbit.com/favicon.ico', 'FITFRIEND', 'Fitbit Premium gives you guidance to help you move more, manage stress, sleep better and eat well.', 'New Premium subscribers only.', '90-day free trial', '1 month free Premium for each successful referral', 'https://fitbit.com/premium/refer', FALSE, health_wellness_id);

    -- Education referrals
    INSERT INTO referral_codes (service_name, logo_url, code, description, terms, user_benefit, referrer_benefit, url, featured, category_id) VALUES
    ('Skillshare', 'https://www.skillshare.com/favicon.ico', 'LEARNFREE', 'Skillshare is an online learning community with thousands of classes in design, business, tech, and more.', 'New users only.', '1 month free Premium membership', '1 month free Premium for each friend who joins', 'https://skillshare.com/refer', TRUE, education_id),
    
    ('Duolingo<boltArtifact id="supabase-sql-migration-with-if-not-exists" title="Supabase SQL Migration with IF NOT EXISTS">
<boltAction type="file" filePath="supabase/migrations/20240701000000_initial_schema.sql"> Plus', 'https://www.duolingo.com/favicon.ico', 'LINGOFRIEND', 'Duolingo Plus removes ads and gives you additional features to help you learn languages.', 'New Plus subscribers only.', '7-day free trial', '7 days of Plus for each friend who subscribes', 'https://duolingo.com/refer', FALSE, education_id);
  END IF;
END $$;

-- Set up RLS policies if they don't exist
DO $$
BEGIN
  -- Enable RLS on tables
  ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
  ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
  ALTER TABLE referral_submissions ENABLE ROW LEVEL SECURITY;
  
  -- Create policies if they don't exist
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Allow public read access for categories') THEN
    CREATE POLICY "Allow public read access for categories" 
    ON categories FOR SELECT 
    USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'referral_codes' AND policyname = 'Allow public read access for referral_codes') THEN
    CREATE POLICY "Allow public read access for referral_codes" 
    ON referral_codes FOR SELECT 
    USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'referral_submissions' AND policyname = 'Allow authenticated users to insert referral_submissions') THEN
    CREATE POLICY "Allow authenticated users to insert referral_submissions" 
    ON referral_submissions FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Allow admins to manage categories') THEN
    CREATE POLICY "Allow admins to manage categories" 
    ON categories FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'admin') 
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'referral_codes' AND policyname = 'Allow admins to manage referral_codes') THEN
    CREATE POLICY "Allow admins to manage referral_codes" 
    ON referral_codes FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'admin') 
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'referral_submissions' AND policyname = 'Allow admins to manage referral_submissions') THEN
    CREATE POLICY "Allow admins to manage referral_submissions" 
    ON referral_submissions FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'admin') 
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');
  END IF;
END $$;
