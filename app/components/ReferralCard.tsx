import { Link } from "@remix-run/react";
import type { ReferralCode } from "~/lib/supabase";

export default function ReferralCard({ referral }: { referral: ReferralCode }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center mb-4">
          {referral.logo_url ? (
            <img 
              src={referral.logo_url} 
              alt={`${referral.service_name} logo`} 
              className="w-12 h-12 object-contain rounded-md mr-3"
            />
          ) : (
            <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
              <span className="text-indigo-600 font-bold text-xl">
                {referral.service_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{referral.service_name}</h3>
          </div>
          {referral.featured && (
            <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{referral.description}</p>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Referral Code:</div>
          <div className="flex items-center">
            <code className="bg-gray-100 px-3 py-1 rounded-md text-gray-800 font-mono flex-grow">
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
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">You Get:</div>
            <p className="text-sm text-gray-800">{referral.user_benefit}</p>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Referrer Gets:</div>
            <p className="text-sm text-gray-800">{referral.referrer_benefit}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/referrals/${referral.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View Details
          </Link>
          
          {referral.url && (
            <a 
              href={referral.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
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
