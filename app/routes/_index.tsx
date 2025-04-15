import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategories, getReferralCodes } from "~/lib/supabase";
import Hero from "~/components/Hero";
import ReferralCard from "~/components/ReferralCard";
import CategoryBadge from "~/components/CategoryBadge";

export const meta: MetaFunction = () => {
  return [
    { title: "ReferralHub - Share and Discover Referral Codes" },
    { name: "description", content: "Find and share referral codes for your favorite services and earn rewards together." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [featuredReferrals, recentReferrals, categories] = await Promise.all([
    getReferralCodes({ featured: true, limit: 4 }),
    getReferralCodes({ limit: 8 }),
    getCategories()
  ]);

  return json({
    featuredReferrals,
    recentReferrals,
    categories
  });
}

export default function Index() {
  const { featuredReferrals, recentReferrals, categories } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Referrals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Referrals</h2>
            <a href="/featured" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {featuredReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        {/* Recent Referrals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added</h2>
          <div className="space-y-4">
            {recentReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
