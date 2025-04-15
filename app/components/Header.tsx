import { Link } from "@remix-run/react";
import { useState } from "react";
import type { Category } from "~/lib/supabase";

export default function Header({ categories }: { categories: Category[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">ReferralHub</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <div className="relative group">
                <button 
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Categories
                  <svg 
                    className="ml-1 h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition ease-out duration-200">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link 
                to="/featured" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Featured
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Link
                to="/submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Code
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div>
              <div className="px-3 py-2 text-base font-medium text-gray-700">
                Categories
              </div>
              <div className="pl-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/featured"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Featured
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/submit"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Code
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
