import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/types/supabase';

// Use environment variables or fallback to hardcoded values
const supabaseUrl = process.env.SUPABASE_URL || 'https://tgzkmcsoekyuhqavrhno.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemttY3NvZWt5dWhxYXZyaG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTk0NzIsImV4cCI6MjA1OTg3NTQ3Mn0.nz4ueg3g_w-uDg8ttB_y2Ch67QNu6Z-hs9yPDosArz8';

// Create a single supabase client for the entire server
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
