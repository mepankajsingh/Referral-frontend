import React from 'react';

interface Props {
  id: number;
  appName: string;
  code: string;
  description: string | null;
  url: string;
  userBenefit: string | null;
  referrerBenefit: string | null;
  icon?: string | null;
  slug?: string | null;
}

export default function ReferralCardListReact({
  id,
  appName,
  code,
  description,
  url,
  userBenefit,
  referrerBenefit,
  icon,
  slug
}: Props) {
  const detailUrl = slug ? `/referral/${slug}` : `/referral/${id}`;
  
  const handleCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    const button = e.currentTarget;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  };

  // Replace dollar signs with rupee symbol
  const formattedUserBenefit = userBenefit?.replace(/\$/g, '₹');
  const formattedReferrerBenefit = referrerBenefit?.replace(/\$/g, '₹');

  return (
    <div className="bg-white rounded-md shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* App Info Section */}
          <div className="flex items-center md:w-1/3">
            <a href={detailUrl} className="group flex items-center">
              {icon ? (
                <div className="mr-3 w-10 h-10 flex-shrink-0">
                  <img src={icon} alt={`${appName} icon`} className="w-full h-full object-contain rounded" />
                </div>
              ) : (
                <div className="mr-3 w-10 h-10 flex-shrink-0 bg-primary-100 rounded flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-lg">{appName.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{appName}</h3>
            </a>
          </div>
          
          {/* Code Section */}
          <div className="mt-3 md:mt-0 md:w-1/3">
            <div className="text-xs font-medium text-gray-500">Referral Code</div>
            <div className="mt-1 flex">
              <div className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-sm flex-grow">
                {code}
              </div>
              <button 
                className="ml-2 px-2 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 copy-button"
                data-code={code}
                onClick={handleCopyCode}
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-3 md:mt-0 md:w-1/3 md:pl-4">
            <div className="grid grid-cols-2 gap-3">
              {userBenefit && (
                <div>
                  <div className="text-xs font-medium text-gray-500">You Get</div>
                  <div className="mt-0.5 text-sm text-gray-800">{formattedUserBenefit}</div>
                </div>
              )}
              
              {referrerBenefit && (
                <div>
                  <div className="text-xs font-medium text-gray-500">Referrer Gets</div>
                  <div className="mt-0.5 text-sm text-gray-800">{formattedReferrerBenefit}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {description && (
          <div className="mt-3 text-sm text-gray-600 line-clamp-2 border-t pt-2 border-gray-100">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
