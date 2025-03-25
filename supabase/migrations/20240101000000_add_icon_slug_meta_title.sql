-- Add screenshots column to referral_codes table
-- Note: icon, slug, and meta_title columns already exist, so we're not adding them again
ALTER TABLE referral_codes ADD COLUMN screenshots TEXT[]; -- Add screenshots array column

-- Initialize screenshots as empty array
UPDATE referral_codes
SET screenshots = '{}';

-- Set default meta_title based on app_name (only if meta_title is null)
UPDATE referral_codes
SET meta_title = app_name || ' Referral Code | Get Exclusive Benefits'
WHERE meta_title IS NULL;

-- Create index for slug for faster lookups (if it doesn't exist already)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_referral_codes_slug') THEN
        CREATE INDEX idx_referral_codes_slug ON referral_codes(slug);
    END IF;
END$$;
