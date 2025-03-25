import { useState } from 'react';
import pkg from 'react';
const { FormEvent } = pkg;

interface SearchBarProps {
  initialValue: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300 py-3"
            placeholder="Search for referral codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}
