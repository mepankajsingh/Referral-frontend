import { Link } from '@remix-run/react';
import type { Category } from '~/types/supabase';
import CategoryCard from './CategoryCard';

interface CategoriesSectionProps {
  categories: Category[];
  counts?: Record<number, number>;
}

export default function CategoriesSection({ categories, counts }: CategoriesSectionProps) {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Browse Categories</h2>
        <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            count={counts ? counts[category.id] : undefined}
          />
        ))}
      </div>
    </section>
  );
}
