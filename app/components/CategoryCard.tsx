import { Link } from '@remix-run/react';
import type { Category } from '~/types/supabase';

interface CategoryCardProps {
  category: Category;
  count?: number;
}

export default function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link 
      to={`/category/${category.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="p-6 flex items-center">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <img 
            src={category.icon_link} 
            alt={category.name} 
            className="w-8 h-8"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          {count !== undefined && (
            <p className="text-sm text-gray-500">{count} referral{count !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
