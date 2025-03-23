import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface FilterComponentProps {
  categories: Category[];
  onFilterChange: (categoryId: number | null) => void;
}

export default function FilterComponent({ categories, onFilterChange }: FilterComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onFilterChange(categoryId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-700 mb-3">Filter by Category</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            id="category-all"
            type="radio"
            name="category"
            checked={selectedCategory === null}
            onChange={() => handleCategoryChange(null)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
            All Categories
          </label>
        </div>
        
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              id={`category-${category.id}`}
              type="radio"
              name="category"
              checked={selectedCategory === category.id}
              onChange={() => handleCategoryChange(category.id)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
