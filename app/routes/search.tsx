import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Referral } from '~/types/supabase';
import ReferralCard from '~/components/ReferralCard';
import SearchBar from '~/components/SearchBar';
import { generateSeoMeta } from '~/utils/helpers';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  
  const { query } = data;
  return generateSeoMeta({
    title: `Search Results for "${query}" - ReferBonus`,
    description: `Find referral codes and rewards for "${query}" on ReferBonus.`,
  });
};

type LoaderData = {
  referrals: Referral[];
  query: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  if (!query) {
    return json<LoaderData>({
      referrals: [],
      query: '',
    });
  }

  // Search referrals
  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('*')
    .or(`app_name.ilike.%${query}%,description.ilike.%${query}%,title.ilike.%${query}%`)
    .order('views', { ascending: false });

  if (error) {
    console.error('Error searching referrals:', error);
  }

  return json<LoaderData>({
    referrals: referrals || [],
    query,
  });
};

export default function SearchPage() {
  const { referrals, query } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {query ? (
          <p className="text-gray-600">
            {referrals.length} result{referrals.length !== 1 ? 's' : ''} found for "{query}"
          </p>
        ) : (
          <p className="text-gray-600">Enter a search term to find referral codes.</p>
        )}
      </div>
      
      {query && referrals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      ) : query ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No results found</h2>
          <p className="text-gray-600">
            We couldn't find any referral codes matching "{query}". Try a different search term.
          </p>
        </div>
      ) : null}
    </div>
  );
}
