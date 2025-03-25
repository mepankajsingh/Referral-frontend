import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  count: number;
}

interface CategoryListClientProps {
  initialCategories: Category[];
}

export default function CategoryListClient({ initialCategories }: CategoryListClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <a 
          key={category.id}
          href={`/category/${category.slug}`}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow group"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
              {category.count} {category.count === 1 ? 'referral' : 'referrals'}
            </span>
            <span className="text-primary-600 text-sm font-medium group-hover:underline">View all →</span>
          </div>
        </a>
      ))}
    </div>
  );
}
