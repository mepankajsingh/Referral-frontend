import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getCategories, getReferralCodes } from "~/lib/supabase";
import ReferralCard from "~/components/ReferralCard";
import EmptyState from "~/components/EmptyState";

export const meta: MetaFunction = () => {
  return [
    { title: "Featured Referral Codes - ReferralHub" },
    { name: "description", content: "Browse our curated selection of the best referral codes across various services." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [featuredReferrals, categories] = await Promise.all([
    getReferralCodes({ featured: true }),
    getCategories()
  ]);

  return json({
    featuredReferrals,
    categories
  });
}

export default function FeaturedPage() {
  const { featuredReferrals } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">Featured</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured Referral Codes
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
              Our curated selection of the best referral codes across various services.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {featuredReferrals.length > 0 ? (
          <div className="space-y-4">
            {featuredReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No featured referrals yet"
            description="We don't have any featured referral codes at the moment. Check back soon!"
            actionText="Back to home"
            actionLink="/"
          />
        )}
      </div>
    </div>
  );
}
