import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategories, getCategoryBySlug, getReferralCodeById } from "~/lib/supabase";
import CategoryBadge from "~/components/CategoryBadge";

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
  const { id } = params;
  
  if (!id) {
    throw new Response("Referral ID is required", { status: 400 });
  }
  
  const referral = await getReferralCodeById(id);
  
  if (!referral) {
    throw new Response("Referral code not found", { status: 404 });
  }
  
  const categories = await getCategories();
  const category = categories.find(cat => cat.id === referral.category_id) || null;
  
  return json({ referral, category });
}

export default function ReferralDetailPage() {
  const { referral, category } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            {referral.logo_url ? (
              <img 
                src={referral.logo_url} 
                alt={`${referral.service_name} logo`} 
                className="w-16 h-16 object-contain rounded-md mr-4"
              />
            ) : (
              <div className="w-16 h-16 bg-indigo-100 rounded-md flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold text-2xl">
                  {referral.service_name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{referral.service_name}</h1>
              {category && (
                <div className="mt-2">
                  <CategoryBadge category={category} />
                </div>
              )}
            </div>
            {referral.featured && (
              <span className="ml-auto bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{referral.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral Code</h2>
            <div className="flex items-center">
              <code className="bg-white px-4 py-3 rounded-md text-gray-800 font-mono text-lg flex-grow border border-gray-200">
                {referral.code}
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(referral.code);
                  alert('Code copied to clipboard!');
                }}
                className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">What You Get</h2>
              <p className="text-green-700">{referral.user_benefit}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">What Referrer Gets</h2>
              <p className="text-blue-700">{referral.referrer_benefit}</p>
            </div>
          </div>
          
          {referral.terms && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h2>
              <div className="prose max-w-none text-gray-600 text-sm">
                <p>{referral.terms}</p>
              </div>
            </div>
          )}
          
          {referral.screenshot_url && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Screenshot</h2>
              <img 
                src={referral.screenshot_url} 
                alt={`${referral.service_name} screenshot`} 
                className="w-full rounded-lg border border-gray-200"
              />
            </div>
          )}
          
          {referral.url && (
            <div className="flex justify-center">
              <a 
                href={referral.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Use This Referral Code
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
