import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 2a1 1 0 01.707 1.707L15 4.414l.707.707A1 1 0 0115 7a1 1 0 01-.707-.293L13.586 6l-.707.707A1 1 0 0112 7a1 1 0 01-.707-1.707l.707-.707-.707-.707A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </span>
          ReferBonus
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">
            Home
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium">
            Categories
          </Link>
          <Link to="/featured" className="text-gray-600 hover:text-indigo-600 font-medium">
            Featured
          </Link>
        </nav>
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
