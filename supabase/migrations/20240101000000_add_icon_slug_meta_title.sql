-- Add icon, slug, and meta_title columns to referral_codes table
ALTER TABLE referral_codes ADD COLUMN icon TEXT;
ALTER TABLE referral_codes ADD COLUMN slug VARCHAR(255) UNIQUE;
ALTER TABLE referral_codes ADD COLUMN meta_title VARCHAR(255);

-- Generate slugs for existing referral codes
-- Convert app_name to lowercase, replace spaces with hyphens, and append id for uniqueness
UPDATE referral_codes
SET slug = LOWER(REGEXP_REPLACE(app_name, '[^a-zA-Z0-9]', '-', 'g')) || '-' || id;

-- Set default meta_title based on app_name
UPDATE referral_codes
SET meta_title = app_name || ' Referral Code | Get Exclusive Benefits';

-- Create index for slug for faster lookups
CREATE INDEX idx_referral_codes_slug ON referral_codes(slug);
