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

export default function ReferralCardReact({
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
  // Remove numbers from slug if present, otherwise use ID
  const cleanSlug = slug ? slug.replace(/-\d+$/, '') : id;
  const detailUrl = `/referral/${cleanSlug}`;
  
  const handleCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    const button = e.currentTarget;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  };

  return (
    <div className="bg-white rounded-md shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <a href={detailUrl} className="group">
            <div className="flex items-center">
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
            </div>
          </a>
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
        
        <div className="mt-3 space-y-2">
          <div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userBenefit && (
              <div>
                <div className="text-xs font-medium text-gray-500">You Get</div>
                <div className="mt-0.5 text-sm text-gray-800">{userBenefit}</div>
              </div>
            )}
            
            {referrerBenefit && (
              <div>
                <div className="text-xs font-medium text-gray-500">Referrer Gets</div>
                <div className="mt-0.5 text-sm text-gray-800">{referrerBenefit}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
</bolt<boltAction type="file" filePath="src/components/ReferralCardReact.tsx">import React from 'react';

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

export default function ReferralCardReact({
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
  // Remove numbers from slug if present, otherwise use ID
  const cleanSlug = slug ? slug.replace(/-\d+$/, '') : id;
  const detailUrl = `/referral/${cleanSlug}`;
  
  const handleCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    const button = e.currentTarget;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  };

  return (
    <div className="bg-white rounded-md shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <a href={detailUrl} className="group">
            <div className="flex items-center">
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
            </div>
          </a>
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
        
        <div className="mt-3 space-y-2">
          <div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userBenefit && (
              <div>
                <div className="text-xs font-medium text-gray-500">You Get</div>
                <div className="mt-0.5 text-sm text-gray-800">{userBenefit}</div>
              </div>
            )}
            
            {referrerBenefit && (
              <div>
                <div className="text-xs font-medium text-gray-500">Referrer Gets</div>
                <div className="mt-0.5 text-sm text-gray-800">{referrerBenefit}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
