import { Link } from "@remix-run/react";
import type { Category } from "~/lib/supabase";

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
    >
      {category.name}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
