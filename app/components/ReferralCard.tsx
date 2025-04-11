import { useState } from 'react';
import { Link } from '@remix-run/react';
import type { Referral } from '~/types/supabase';
import { copyToClipboard } from '~/utils/helpers';

interface ReferralCardProps {
  referral: Referral;
  featured?: boolean;
}

export default function ReferralCard({ referral, featured = false }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(referral.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border ${featured ? 'border-indigo-200' : 'border-gray-200'}`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img 
            src={referral.app_logo} 
            alt={`${referral.app_name} logo`} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{referral.app_name}</h3>
            {referral.reward && (
              <p className="text-sm text-indigo-600 font-medium">{referral.reward}</p>
            )}
          </div>
          {featured && (
            <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        {referral.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{referral.description}</p>
        )}
        
        <div className="flex items-center justify-between bg-gray-50 rounded p-2 mb-4">
          <code className="text-sm font-mono text-gray-800">{referral.code}</code>
          <button 
            onClick={handleCopyCode}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/referral/${referral.slug}`}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details
          </Link>
          <div className="text-xs text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {referral.views} views
          </div>
        </div>
      </div>
    </div>
  );
}
