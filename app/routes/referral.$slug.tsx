import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Referral, Category } from '~/types/supabase';
import { formatDate, copyToClipboard, generateSeoMeta } from '~/utils/helpers';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.referral) {
    return generateSeoMeta({
      title: "Referral Not Found - ReferBonus",
      description: "The referral code you're looking for could not be found.",
    });
  }

  return generateSeoMeta({
    title: `${data.referral.app_name} Referral Code - ReferBonus`,
    description: data.referral.description || `Get rewards with this ${data.referral.app_name} referral code. ${data.referral.reward || ''}`,
  });
};

type LoaderData = {
  referral: Referral | null;
  category: Category | null;
  relatedReferrals: Referral[];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Referral slug is required", { status: 400 });
  }

  // Get referral by slug
  const { data: referral, error: referralError } = await supabase
    .from('referrals')
    .select('*')
    .eq('slug', slug)
    .single();

  if (referralError && referralError.code !== 'PGRST116') {
    console.error('Error fetching referral:', referralError);
  }

  if (!referral) {
    throw new Response("Referral not found", { status: 404 });
  }

  // Increment view count
  await supabase
    .from('referrals')
    .update({ views: (referral.views || 0) + 1 })
    .eq('id', referral.id);

  // Get category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', referral.category_id)
    .single();

  if (categoryError) {
    console.error('Error fetching category:', categoryError);
  }

  // Get related referrals
  const { data: relatedReferrals, error: relatedError } = await supabase
    .from('referrals')
    .select('*')
    .eq('category_id', referral.category_id)
    .neq('id', referral.id)
    .limit(3);

  if (relatedError) {
    console.error('Error fetching related referrals:', relatedError);
  }

  return json<LoaderData>({
    referral,
    category,
    relatedReferrals: relatedReferrals || [],
  });
};

export default function ReferralPage() {
  const { referral, category, relatedReferrals } = useLoaderData<typeof loader>();
  const [copied, setCopied] = useState(false);

  if (!referral) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Referral Not Found</h1>
        <p className="text-gray-600">The referral code you're looking for could not be found.</p>
      </div>
    );
  }

  const handleCopyCode = async () => {
    const success = await copyToClipboard(referral.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        {category && (
          <Link 
            to={`/category/${category.slug}`}
            className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to {category.name}
          </Link>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img 
              src={referral.app_logo} 
              alt={`${referral.app_name} logo`} 
              className="w-16 h-16 rounded-full object-cover mr-5"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{referral.app_name}</h1>
              {referral.reward && (
                <p className="text-indigo-600 font-medium">{referral.reward}</p>
              )}
            </div>
            {referral.is_featured && (
              <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          {referral.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600">{referral.description}</p>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Referral Code</h2>
            <div className="flex items-center justify-between bg-gray-50 rounded p-4">
              <code className="text-lg font-mono text-gray-800">{referral.code}</code>
              <button 
                onClick={handleCopyCode}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded flex items-center"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
          
          {referral.app_url && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">How to Use</h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Copy the referral code above</li>
                <li>
                  Visit the{' '}
                  <a 
                    href={referral.app_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    {referral.app_name} website
                  </a>
                  {' '}or open the app
                </li>
                <li>Enter the code during signup or in the promotions section</li>
                <li>Enjoy your rewards!</li>
              </ol>
            </div>
          )}
          
          {referral.terms && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h2>
              <p className="text-gray-600 text-sm">{referral.terms}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {referral.views} views
            </div>
            <div>
              Added on {formatDate(referral.created_at)}
            </div>
          </div>
        </div>
      </div>
      
      {relatedReferrals.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Referrals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedReferrals.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <img 
                      src={related.app_logo} 
                      alt={`${related.app_name} logo`} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{related.app_name}</h3>
                      {related.reward && (
                        <p className="text-sm text-indigo-600 font-medium">{related.reward}</p>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/referral/${related.slug}`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center"
                  >
                    View Referral
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
