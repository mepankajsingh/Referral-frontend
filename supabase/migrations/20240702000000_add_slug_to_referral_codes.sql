-- Add slug column to referral_codes table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'referral_codes' AND column_name = 'slug'
  ) THEN
    ALTER TABLE referral_codes ADD COLUMN slug TEXT;
    
    -- Generate initial slugs based on service_name
    UPDATE referral_codes
    SET slug = LOWER(REGEXP_REPLACE(service_name, '[^a-zA-Z0-9]', '-', 'g'));
    
    -- Add NOT NULL constraint after populating data
    ALTER TABLE referral_codes ALTER COLUMN slug SET NOT NULL;
    
    -- Add unique constraint
    ALTER TABLE referral_codes ADD CONSTRAINT referral_codes_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Create index on slug if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'referral_codes_slug_idx') THEN
    CREATE INDEX referral_codes_slug_idx ON referral_codes(slug);
  END IF;
END $$;

-- Update the sample data insertion to include slug
DO $$
BEGIN
  -- Only update the INSERT statements if we're inserting new data
  -- This won't run if we already have data, as checked in the main migration
  IF (SELECT COUNT(*) FROM referral_codes) = 0 THEN
    -- The original INSERT statements would be modified to include slug values
    -- This is just a placeholder since we're not actually inserting new data here
    RAISE NOTICE 'Would update INSERT statements to include slug values if inserting new data';
  END IF;
END $$;
