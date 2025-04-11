import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { supabase } from '~/utils/supabase.server';
import type { Category } from '~/types/supabase';
import CategoryCard from '~/components/CategoryCard';
import { generateSeoMeta } from '~/utils/helpers';

export const meta: MetaFunction = () => {
  return generateSeoMeta({
    title: "All Categories - ReferBonus",
    description: "Browse all categories of referral codes and find the perfect discount for your needs.",
  });
};

type LoaderData = {
  categories: Category[];
  categoryCounts: Record<number, number>;
};

export const loader = async () => {
  // Get all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
  }

  // Get category counts
  const { data: countData, error: countError } = await supabase
    .from('referrals')
    .select('category_id, count')
    .group('category_id');

  if (countError) {
    console.error('Error fetching category counts:', countError);
  }

  // Format category counts
  const categoryCounts: Record<number, number> = {};
  countData?.forEach((item: any) => {
    categoryCounts[item.category_id] = item.count;
  });

  return json<LoaderData>({
    categories: categories || [],
    categoryCounts,
  });
};

export default function CategoriesPage() {
  const { categories, categoryCounts } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Categories</h1>
        <p className="text-gray-600">Browse all categories of referral codes and find the perfect discount for your needs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            count={categoryCounts[category.id] || 0}
          />
        ))}
      </div>
    </div>
  );
}
