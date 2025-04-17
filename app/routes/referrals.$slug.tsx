import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getCategories, getReferralCodeBySlug, getReferralCodes } from "~/lib/supabase";
import CategoryBadge from "~/components/CategoryBadge";
import RecommendedReferrals from "~/components/RecommendedReferrals";
import HtmlContent from "~/components/HtmlContent";
import { useState } from "react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.referral) {
    return [
      { title: "Referral Code Not Found - ReferralHub" },
      { name: "description", content: "The requested referral code could not be found." },
    ];
  }
  
  return [
    { title: `${data.referral.service_name} Referral Code - ReferralHub` },
    { name: "description", content: data.referral.description },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Referral slug is required", { status: 400 });
  }
  
  const referral = await getReferralCodeBySlug(slug);
  
  if (!referral) {
    throw new Response("Referral code not found", { status: 404 });
  }
  
  const categories = await getCategories();
  const category = categories.find(cat => cat.id === referral.category_id) || null;
  
  // Get similar referrals from the same category
  const similarReferrals = await getReferralCodes({ 
    categoryId: referral.category_id,
    limit: 4 // Fetch 4 to ensure we have at least 3 after filtering out current one
  });
  
  return json({ referral, category, similarReferrals });
}

export default function ReferralDetailPage() {
  const { referral, category, similarReferrals } = useLoaderData<typeof loader>();
  const [copied, setCopied] = useState(false);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header section with gradient background - matching categories page */}
      <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb navigation - matching categories page */}
          <nav className="flex mb-3 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <Link to={`/categories/${category.slug}`} className="hover:text-indigo-600">{category.name}</Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-700 font-medium">{referral.service_name}</span>
          </nav>
          
          {/* Header content with service name and logo */}
          <div className="flex items-center">
            {referral.logo_url ? (
              <img 
                src={referral.logo_url} 
                alt={`${referral.service_name} logo`} 
                className="w-20 h-20 object-contain rounded-lg mr-6 bg-white p-3 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mr-6 shadow-sm">
                <span className="text-indigo-600 font-bold text-2xl">
                  {referral.service_name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex flex-col justify-center">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900">{referral.service_name}</h1>
                {referral.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </span>
                )}
              </div>
              {category && (
                <div className="mt-1">
                  <CategoryBadge category={category} />
                </div>
              )}
              <HtmlContent html={referral.description} className="mt-2 text-sm text-gray-600 max-w-3xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* NEW: Prominent Referral Code Section */}
      <div className="bg-indigo-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
            <div className="p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Referral Code
                    </h2>
                    {referral.url && (
                      <a 
                        href={referral.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors"
                      >
                        Use This Referral
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200 flex-grow">
                      <code className="text-lg font-mono text-indigo-800 font-semibold select-all">
                        {referral.code}
                      </code>
                    </div>
                    <button 
                      onClick={handleCopyCode}
                      className={`ml-3 px-4 py-3 rounded-md flex items-center transition-colors ${
                        copied 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-200'
                      }`}
                      aria-label="Copy code to clipboard"
                    >
                      {copied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="p-5">
            {/* Benefits section - side by side with smaller text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2 className="text-base font-semibold text-green-800">You Get</h2>
                </div>
                <HtmlContent html={referral.user_benefit} className="text-sm text-green-700" />
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h2 className="text-base font-semibold text-blue-800">Referrer Gets</h2>
                </div>
                <HtmlContent html={referral.referrer_benefit} className="text-sm text-blue-700" />
              </div>
            </div>
            
            {/* Terms section */}
            {referral.terms && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 01-2-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-base font-semibold text-gray-900">Terms & Conditions</h2>
                </div>
                <div className="text-sm text-gray-600">
                  <HtmlContent html={referral.terms} />
                </div>
              </div>
            )}
            
            {/* Screenshot section */}
            {referral.screenshot_url && (
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-base font-semibold text-gray-900">Screenshot</h2>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={referral.screenshot_url} 
                    alt={`${referral.service_name} screenshot`} 
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            {/* Recommended Referrals section */}
            <RecommendedReferrals referrals={similarReferrals} 
              currentReferralId={referral.id} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
