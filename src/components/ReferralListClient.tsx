import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ReferralCardSkeleton from './ReferralCardSkeleton';

interface Referral {
  id: number;
  app_name: string;
  code: string;
  description: string;
  url: string;
  user_benefit: string;
  referrer_benefit: string;
  category_id: number;
  categories: {
    name: string;
  };
}

interface ReferralListClientProps {
  initialReferrals: Referral[];
  categoryId?: string | null;
  search?: string | null;
  page?: number;
  totalPages?: number;
}

export default function ReferralListClient({ 
  initialReferrals, 
  categoryId, 
  search, 
  page = 1,
  totalPages = 1
}: ReferralListClientProps) {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  
  const pageSize = 12;

  useEffect(() => {
    // Load categories
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      
      if (data) {
        setCategories(data);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    // Reset to initial data when props change
    setReferrals(initialReferrals);
    setCurrentPage(page);
    setSearchTerm(search || '');
    setSelectedCategory(categoryId || '');
  }, [initialReferrals, categoryId, search, page]);

  const fetchReferrals = async (newPage: number, newCategory: string, newSearch: string) => {
    setIsLoading(true);
    
    const offset = (newPage - 1) * pageSize;
    
    let query = supabase
      .from('referral_codes')
      .select('*, categories(name)');
    
    if (newCategory) {
      query = query.eq('category_id', newCategory);
    }
    
    if (newSearch) {
      query = query.ilike('app_name', `%${newSearch}%`);
    }
    
    const { data } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);
    
    if (data) {
      setReferrals(data);
    }
    
    setIsLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url.toString());
    
    fetchReferrals(newPage, selectedCategory, searchTerm);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('page', '1');
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    } else {
      url.searchParams.delete('category');
    }
    if (searchTerm) {
      url.searchParams.set('search', searchTerm);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
    
    fetchReferrals(1, selectedCategory, searchTerm);
  };

  return (
    <div>
      <div className="mb-8">
        <form onSubmit={handleFilter} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input 
              type="text" 
              placeholder="Search by app name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700"
          >
            Filter
          </button>
        </form>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <ReferralCardSkeleton key={index} />
          ))}
        </div>
      ) : referrals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <div key={referral.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{referral.app_name}</h3>
              <p className="text-sm text-gray-600 mb-3">{referral.description}</p>
              
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-3">
                <p className="font-mono text-lg text-center select-all">{referral.code}</p>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>User gets: {referral.user_benefit}</span>
                <span>Referrer gets: {referral.referrer_benefit}</span>
              </div>
              
              {referral.url && (
                <a 
                  href={referral.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-sm text-primary-600 hover:underline"
                >
                  Visit website
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No referral codes found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setCurrentPage(1);
              fetchReferrals(1, '', '');
            }}
            className="mt-4 inline-block text-primary-600 hover:underline"
          >
            View all referral codes
          </button>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Previous Page */}
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === pageNum
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            {/* Next Page */}
            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
