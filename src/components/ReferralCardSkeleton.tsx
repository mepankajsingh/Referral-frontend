import React from 'react';

export default function ReferralCardSkeleton() {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* App Info Section */}
          <div className="flex items-center md:w-1/3">
            <div className="mr-3 w-10 h-10 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          
          {/* Code Section */}
          <div className="mt-3 md:mt-0 md:w-1/3">
            <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="flex">
              <div className="bg-gray-200 h-8 rounded flex-grow"></div>
              <div className="ml-2 bg-gray-200 h-8 w-12 rounded"></div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-3 md:mt-0 md:w-1/3 md:pl-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 border-t pt-2 border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
        </div>
      </div>
    </div>
  );
}
