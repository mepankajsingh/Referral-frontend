import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getCategories, getReferralCodeBySlug, getReferralCodes } from "~/lib/supabase";
import CategoryBadge from "~/components/CategoryBadge";
import RecommendedReferrals from "~/components/RecommendedReferrals";

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
                className="w-14 h-14 object-contain rounded-lg mr-5 bg-white p-2 shadow-sm"
              />
            ) : (
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mr-5 shadow-sm">
                <span className="text-indigo-600 font-bold text-xl">
                  {referral.service_name.charAt(0)}
                </span>
              </div>
            )}
            <div>
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
              <p className="mt-2 text-sm text-gray-600 max-w-3xl">{referral.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="p-5">
            {/* Referral code section */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Referral Code
                </h2>
                <div className="text-xs text-gray-500">Copy and use</div>
              </div>
              <div className="flex items-center">
                <code className="bg-white px-3 py-2 rounded-md text-gray-800 font-mono text-sm flex-grow border border-gray-200 select-all">
                  {referral.code}
                </code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(referral.code);
                    alert('Code copied to clipboard!');
                  }}
                  className="ml-3 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                  aria-label="Copy code to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
            
            {/* Benefits section - side by side with smaller text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2 className="text-base font-semibold text-green-800">You Get</h2>
                </div>
                <p className="text-sm text-green-700">{referral.user_benefit}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h2 className="text-base font-semibold text-blue-800">Referrer Gets</h2>
                </div>
                <p className="text-sm text-blue-700">{referral.referrer_benefit}</p>
              </div>
            </div>
            
            {/* Terms section */}
            {referral.terms && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-base font-semibold text-gray-900">Terms & Conditions</h2>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{referral.terms}</p>
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
            
            {/* CTA button */}
            {referral.url && (
              <div className="flex justify-center mt-4">
                <a 
                  href={referral.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Use This Referral Code
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            
            {/* Recommended Referrals section - updated to match categories page styling */}
            <RecommendedReferrals referrals={similarReferrals} 
              currentReferralId={referral.id} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
