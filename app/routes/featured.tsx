import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Referral } from '~/types/supabase';
import ReferralCard from '~/components/ReferralCard';
import { generateSeoMeta } from '~/utils/helpers';

export const meta: MetaFunction = () => {
  return generateSeoMeta({
    title: "Featured Referral Codes - ReferBonus",
    description: "Discover our hand-picked selection of the best referral codes with the highest rewards and benefits.",
  });
};

type LoaderData = {
  referrals: Referral[];
};

export const loader = async () => {
  // Get all featured referrals
  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('is_featured', true)
    .order('views', { ascending: false });

  if (error) {
    console.error('Error fetching featured referrals:', error);
  }

  return json<LoaderData>({
    referrals: referrals || [],
  });
};

export default function FeaturedPage() {
  const { referrals } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Featured Referral Codes</h1>
        <p className="text-gray-600">Discover our hand-picked selection of the best referral codes with the highest rewards and benefits.</p>
      </div>
      
      {referrals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} featured={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No featured referrals found</h2>
          <p className="text-gray-600">Check back soon for featured referral codes.</p>
        </div>
      )}
    </div>
  );
}
