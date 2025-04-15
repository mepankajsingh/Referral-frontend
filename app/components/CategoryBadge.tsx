import { Link } from "@remix-run/react";
import type { Category } from "~/lib/supabase";

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link 
      to={`/categories/${category.slug}`}
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
    >
      {category.name}
    </Link>
  );
}
