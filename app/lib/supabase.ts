import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgzkmcsoekyuhqavrhno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemttY3NvZWt5dWhxYXZyaG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTk0NzIsImV4cCI6MjA1OTg3NTQ3Mn0.nz4ueg3g_w-uDg8ttB_y2Ch67QNu6Z-hs9yPDosArz8';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database tables
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
};

export type ReferralCode = {
  id: string;
  service_name: string;
  logo_url?: string;
  code: string;
  description: string;
  terms?: string;
  user_benefit: string;
  referrer_benefit: string;
  screenshot_url?: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  url?: string;
  featured: boolean;
  slug: string;
  title?: string; // Added title field
};

// Database functions
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
  
  return data;
}

export async function getReferralCodes(options?: { 
  categoryId?: string, 
  featured?: boolean,
  limit?: number
}): Promise<ReferralCode[]> {
  let query = supabase
    .from('referral_codes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId);
  }
  
  if (options?.featured !== undefined) {
    query = query.eq('featured', options.featured);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching referral codes:', error);
    return [];
  }
  
  return data || [];
}

export async function getReferralCodeById(id: string): Promise<ReferralCode | null> {
  const { data, error } = await supabase
    .from('referral_codes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching referral code with id ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function getReferralCodeBySlug(slug: string): Promise<ReferralCode | null> {
  const { data, error } = await supabase
    .from('referral_codes')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching referral code with slug ${slug}:`, error);
    return null;
  }
  
  return data;
}
