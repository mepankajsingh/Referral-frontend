# Supabase Migration

This directory contains SQL migration files for the Supabase database used in the ReferralHub project.

## Schema Overview

The database consists of three main tables:

1. **categories** - Stores different categories for referral codes
2. **referral_codes** - Stores approved referral codes
3. **referral_submissions** - Stores pending referral code submissions

## Row Level Security (RLS)

The database uses Row Level Security to control access:

- Public read access is allowed for categories and approved referral codes
- Only authenticated users can submit new referral codes
- Only admin users can manage all tables (insert, update, delete)

## Running Migrations

To apply these migrations to your Supabase project:

1. Install the Supabase CLI
2. Link your project: `supabase link --project-ref your-project-ref`
3. Apply migrations: `supabase db push`

## Manual Database Setup

If you prefer to set up the database manually:

1. Go to the Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the migration file
4. Run the SQL commands

## Initial Data

The migration includes initial data for common categories. You may want to add sample referral codes for testing purposes.
