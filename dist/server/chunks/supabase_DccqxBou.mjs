import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://recwwdzhgaymqrvpxrkl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlY3d3ZHpoZ2F5bXFydnB4cmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjA3NTEsImV4cCI6MjA1NzY5Njc1MX0.G_dCeSZBYTGN_HCWuH6k7scuYg5VcPi74OK_Krw275M"
);

export { supabase as s };
