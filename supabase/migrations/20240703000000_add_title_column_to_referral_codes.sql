-- Add title column to referral_codes table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'referral_codes' AND column_name = 'title'
  ) THEN
    -- Add the title column (nullable since existing records won't have a title)
    ALTER TABLE referral_codes ADD COLUMN title TEXT;
    
    -- Add comment explaining the purpose of the column
    COMMENT ON COLUMN referral_codes.title IS 'SEO-friendly title for the referral code page';
    
    -- Initialize title values based on service_name for existing records
    UPDATE referral_codes
    SET title = service_name || ' Referral Code - Get Special Offer';
  END IF;
END $$;
