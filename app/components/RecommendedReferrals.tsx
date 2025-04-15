import { Link } from "@remix-run/react";
import type { ReferralCode } from "~/lib/supabase";

export default function RecommendedReferrals({ 
  referrals, 
  currentReferralId 
}: { 
  referrals: ReferralCode[],
  currentReferralId: number
}) {
  // Filter out the current referral and limit to 3
  const recommendedReferrals = referrals
    .filter(ref => ref.id !== currentReferralId)
    .slice(0, 3);
  
  if (recommendedReferrals.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        You might also like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedReferrals.map((referral) => (
          <Link 
            key={referral.id} 
            to={`/referrals/${referral.slug}`}
            className="block p-5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all bg-white"
          >
            <div className="flex items-center mb-3">
              {referral.logo_url ? (
                <img 
                  src={referral.logo_url} 
                  alt={`${referral.service_name} logo`} 
                  className="w-10 h-10 object-contain mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-indigo-50 rounded-md flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-lg">
                    {referral.service_name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-medium text-lg text-gray-900">{referral.service_name}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{referral.description}</p>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Code: <span className="font-mono">{referral.code}</span></span>
              <span className="text-indigo-600 font-medium flex items-center">
                View details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
