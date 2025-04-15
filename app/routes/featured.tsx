import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getReferralCodes } from "~/lib/supabase";
import ReferralCard from "~/components/ReferralCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Featured Referral Codes - ReferralHub" },
    { name: "description", content: "Browse our featured referral codes for the best deals and rewards." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const featuredReferrals = await getReferralCodes({ featured: true });
  return json({ featuredReferrals });
}

export default function Featured() {
  const { featuredReferrals } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Featured Referral Codes
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Our hand-picked selection of the best referral offers available right now.
        </p>
      </div>
      
      <div className="space-y-4">
        {featuredReferrals.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>
      
      {featuredReferrals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No featured referral codes available at the moment.</p>
        </div>
      )}
    </div>
  );
}
