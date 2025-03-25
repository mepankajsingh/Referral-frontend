import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ReferralCardReact from './ReferralCardReact';
import ReferralCardListReact from './ReferralCardListReact';
import SearchBar from './SearchBar';
import FilterComponent from './FilterComponent';
import Pagination from './Pagination';
import ReferralCardSkeleton from './ReferralCardSkeleton';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Referral {
  id: number;
  app_name: string;
  code: string;
  description: string | null;
  url: string;
  user_benefit: string | null;
  referrer_benefit: string | null;
  icon: string | null;
  slug: string | null;
  categories: {
    name: string;
  };
}

interface Props {
  initialReferrals: Referral[];
  categoryId: string | null;
  search: string | null;
  page: number;
  totalPages: number;
  hideFilters?: boolean;
}

export default function ReferralListClient({ initialReferrals, categoryId, search, page, totalPages, hideFilters = false }: Props) {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId);
  const [searchQuery, setSearchQuery] = useState<string>(search || '');
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(totalPages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const pageSize = 12;

  useEffect(() => {
    // Fetch categories for filter
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name');
      
      if (data) {
        setCategories(data);
      }
    };
    
    if (!hideFilters) {
      fetchCategories();
    }
  }, [hideFilters]);

  const fetchReferrals = async () => {
    setIsLoading(true);
    
    // Calculate offset for pagination
    const offset = (currentPage - 1) * pageSize;
    
    // Build query
    let query = supabase
      .from('referral_codes')
      .select('*, categories(name)', { count: 'exact' });
    
    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }
    
    if (searchQuery) {
      query = query.ilike('app_name', `%${searchQuery}%`);
    }
    
    // Execute query with pagination
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);
    
    if (data) {
      setReferrals(data);
      if (count !== null) {
        setTotalPagesCount(Math.ceil(count / pageSize));
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
    
    // Update URL with current filters
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [currentPage, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {!hideFilters && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
          </div>
          <div className="md:col-span-1">
            <FilterComponent 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onChange={handleCategoryChange} 
            />
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(6).fill(0).map((_, index) => (
            <ReferralCardSkeleton key={index} />
          ))}
        </div>
      ) : referrals.length > 0 ? (
        <div className="space-y-4">
          {referrals.map((referral) => (
            <div key={referral.id} className="referral-card">
              <ReferralCardListReact
                id={referral.id}
                appName={referral.app_name}
                code={referral.code}
                description={referral.description}
                url={referral.url}
                userBenefit={referral.user_benefit}
                referrerBenefit={referral.referrer_benefit}
                icon={referral.icon}
                slug={referral.slug}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No referrals found</h3>
          <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
          {!hideFilters && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
      
      {totalPagesCount > 1 && (
        <div className="mt-8">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPagesCount} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
}
