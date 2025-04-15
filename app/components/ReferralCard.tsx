import { Link } from "@remix-run/react";
import type { ReferralCode } from "~/lib/supabase";

export default function ReferralCard({ referral }: { referral: ReferralCode }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-sm transition-all duration-300 flex flex-col md:flex-row bg-white">
      {/* Logo/Icon Section - Now linked */}
      <Link to={`/referrals/${referral.slug}`} className="p-4 flex items-center justify-center md:w-20 md:min-w-20 hover:bg-gray-50">
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
          <Link to={`/referrals/${referral.slug}`} className="text-base font-medium text-gray-900 hover:text-indigo-600">
            {referral.service_name}
          </Link>
          {referral.featured && (
            <span className="ml-2 bg-yellow-50 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{referral.description}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-1">
          <div>
            <div className="text-xs text-gray-500 mb-0.5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              You Get:
            </div>
            <p className="text-sm text-gray-800 font-medium">{referral.user_benefit}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Referrer Gets:
            </div>
            <p className="text-sm text-gray-800 font-medium">{referral.referrer_benefit}</p>
          </div>
        </div>
      </div>
      
      {/* Action Section */}
      <div className="p-4 flex flex-col justify-between md:w-64 md:min-w-64 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50">
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Referral Code:
          </div>
          <div className="flex items-center">
            <code className="bg-white px-3 py-1.5 rounded text-gray-800 font-mono text-sm flex-grow border border-gray-200 select-all">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
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
