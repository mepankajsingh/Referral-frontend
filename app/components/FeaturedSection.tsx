import { Link } from '@remix-run/react';
import type { Referral } from '~/types/supabase';
import ReferralCard from './ReferralCard';

interface FeaturedSectionProps {
  referrals: Referral[];
}

export default function FeaturedSection({ referrals }: FeaturedSectionProps) {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Referrals</h2>
        <Link to="/featured" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {referrals.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} featured={true} />
        ))}
      </div>
    </section>
  );
}
