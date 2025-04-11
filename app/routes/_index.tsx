import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Referral, Category } from '~/types/supabase';
import Hero from '~/components/Hero';
import FeaturedSection from '~/components/FeaturedSection';
import CategoriesSection from '~/components/CategoriesSection';
import ReferralCard from '~/components/ReferralCard';
import { isBrowser } from '~/utils/helpers';

export const meta: MetaFunction = () => {
  return [
    { title: "ReferBonus - Find & Share Referral Codes" },
    { name: "description", content: "Get discounts and rewards by using referral codes for your favorite apps and services" },
  ];
};

type LoaderData = {
  featuredReferrals: Referral[];
  recentReferrals: Referral[];
  popularReferrals: Referral[];
  categories: Category[];
  categoryCounts: Record<number, number>;
};

export const loader = async () => {
  // Get featured referrals
  const { data: featuredReferrals, error: featuredError } = await supabase
    .from('referrals')
    .select('*')
    .eq('is_featured', true)
    .order('views', { ascending: false })
    .limit(3);

  if (featuredError) {
    console.error('Error fetching featured referrals:', featuredError);
  }

  // Get recent referrals
  const { data: recentReferrals, error: recentError } = await supabase
    .from('referrals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  if (recentError) {
    console.error('Error fetching recent referrals:', recentError);
  }

  // Get popular referrals
  const { data: popularReferrals, error: popularError } = await supabase
    .from('referrals')
    .select('*')
    .order('views', { ascending: false })
    .limit(6);

  if (popularError) {
    console.error('Error fetching popular referrals:', popularError);
  }

  // Get categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .limit(6);

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
  }

  // Get category counts - using a safer approach
  let categoryCounts: Record<number, number> = {};
  
  try {
    const { data: countData, error: countError } = await supabase
      .from('referrals')
      .select('category_id, count')
      .group('category_id');

    if (countError) {
      console.error('Error fetching category counts:', countError);
    } else if (countData) {
      // Format category counts
      countData.forEach((item: any) => {
        if (item && typeof item.category_id === 'number') {
          categoryCounts[item.category_id] = item.count || 0;
        }
      });
    }
  } catch (error) {
    console.error('Error processing category counts:', error);
  }

  return json<LoaderData>({
    featuredReferrals: featuredReferrals || [],
    recentReferrals: recentReferrals || [],
    popularReferrals: popularReferrals || [],
    categories: categories || [],
    categoryCounts,
  });
};

export default function Index() {
  const { featuredReferrals, recentReferrals, popularReferrals, categories, categoryCounts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        {featuredReferrals.length > 0 && (
          <FeaturedSection referrals={featuredReferrals} />
        )}
        
        <CategoriesSection categories={categories} counts={categoryCounts} />
        
        <section className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Referrals</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        </section>
        
        <section className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Referrals</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
