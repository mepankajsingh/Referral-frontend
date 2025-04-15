import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategoryBySlug, getReferralCodes } from "~/lib/supabase";
import ReferralCard from "~/components/ReferralCard";
import EmptyState from "~/components/EmptyState";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.category) {
    return [
      { title: "Category Not Found - ReferralHub" },
      { name: "description", content: "The requested category could not be found." },
    ];
  }
  
  return [
    { title: `${data.category.name} Referral Codes - ReferralHub` },
    { name: "description", content: `Browse referral codes for ${data.category.name} services and earn rewards together.` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Category slug is required", { status: 400 });
  }
  
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    throw new Response("Category not found", { status: 404 });
  }
  
  const referrals = await getReferralCodes({ categoryId: category.id });
  
  return json({ category, referrals });
}

export default function CategoryPage() {
  const { category, referrals } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {category.name} Referral Codes
        </h1>
        {category.description && (
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {category.description}
          </p>
        )}
      </div>
      
      {referrals.length > 0 ? (
        <div className="space-y-6">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No referral codes found"
          description="There are no referral codes available in this category yet."
          actionText="Browse all referrals"
          actionLink="/featured"
        />
      )}
    </div>
  );
}
