import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Referral, Category } from '~/types/supabase';
import ReferralCard from '~/components/ReferralCard';
import { generateSeoMeta } from '~/utils/helpers';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.category) {
    return generateSeoMeta({
      title: "Category Not Found - ReferBonus",
      description: "The category you're looking for could not be found.",
    });
  }

  return generateSeoMeta({
    title: `${data.category.name} Referral Codes - ReferBonus`,
    description: `Find and share referral codes for ${data.category.name} apps and services. Get discounts and rewards.`,
  });
};

type LoaderData = {
  category: Category | null;
  referrals: Referral[];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Category slug is required", { status: 400 });
  }

  // Get category by slug
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (categoryError && categoryError.code !== 'PGRST116') {
    console.error('Error fetching category:', categoryError);
  }

  if (!categoryData) {
    throw new Response("Category not found", { status: 404 });
  }

  // Get referrals for this category
  const { data: referrals, error: referralsError } = await supabase
    .from('referrals')
    .select('*')
    .eq('category_id', categoryData.id)
    .order('views', { ascending: false });

  if (referralsError) {
    console.error('Error fetching referrals:', referralsError);
  }

  return json<LoaderData>({
    category: categoryData,
    referrals: referrals || [],
  });
};

export default function CategoryPage() {
  const { category, referrals } = useLoaderData<typeof loader>();

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
        <p className="text-gray-600">The category you're looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <div className="bg-indigo-100 p-4 rounded-full mr-5">
          <img 
            src={category.icon_link} 
            alt={category.name} 
            className="w-12 h-12"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-gray-600">{referrals.length} referral{referrals.length !== 1 ? 's' : ''} available</p>
        </div>
      </div>
      
      {referrals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No referrals found</h2>
          <p className="text-gray-600">There are no referral codes available for this category yet.</p>
        </div>
      )}
    </div>
  );
}
