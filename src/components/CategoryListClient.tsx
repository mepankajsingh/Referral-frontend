import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface CategoryListClientProps {
  initialCategories: Category[];
}

export default function CategoryListClient({ initialCategories }: CategoryListClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <a 
          key={category.id}
          href={`/category/${category.slug}`}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">{category.count} referrals</span>
          </div>
        </a>
      ))}
    </div>
  );
}
