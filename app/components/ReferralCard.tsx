import { Link } from "@remix-run/react";
import type { ReferralCode } from "~/lib/supabase";

export default function ReferralCard({ referral }: { referral: ReferralCode }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 transition-all duration-300 flex flex-col md:flex-row">
      {/* Logo/Icon Section - Now linked */}
      <Link to={`/referrals/${referral.id}`} className="p-4 flex items-center justify-center md:w-20 md:min-w-20 hover:bg-gray-50">
        {referral.logo_url ? (
          <img 
            src={referral.logo_url} 
            alt={`${referral.service_name} logo`} 
            className="w-10 h-10 object-contain"
          />
        ) : (
          <div className="w-10 h-10 bg-indigo-50 rounded-md flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg">
              {referral.service_name.charAt(0)}
            </span>
          </div>
        )}
      </Link>
      
      {/* Content Section */}
      <div className="flex-grow p-4 border-t md:border-t-0 md:border-l border-gray-100">
        <div className="flex items-center mb-2">
          <Link to={`/referrals/${referral.id}`} className="text-base font-medium text-gray-900 hover:text-indigo-600">
            {referral.service_name}
          </Link>
          {referral.featured && (
            <span className="ml-2 bg-yellow-50 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{referral.description}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-1">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">You Get:</div>
            <p className="text-sm text-gray-800 font-medium">{referral.user_benefit}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Referrer Gets:</div>
            <p className="text-sm text-gray-800 font-medium">{referral.referrer_benefit}</p>
          </div>
        </div>
      </div>
      
      {/* Action Section */}
      <div className="p-4 flex flex-col justify-between md:w-64 md:min-w-64 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50">
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Referral Code:</div>
          <div className="flex items-center">
            <code className="bg-white px-3 py-1.5 rounded text-gray-800 font-mono text-sm flex-grow border border-gray-200">
              {referral.code}
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(referral.code);
                alert('Code copied to clipboard!');
              }}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
              aria-label="Copy code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          {referral.url && (
            <a 
              href={referral.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1.5 border border-indigo-600 text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Use Code
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
