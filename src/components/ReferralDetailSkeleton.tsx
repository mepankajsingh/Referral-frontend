import React from 'react';

export default function ReferralDetailSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-32 mt-2"></div>
        </div>
        
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="mt-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
      </div>
      
      <div className="mt-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="mt-2 p-4 bg-green-50 border border-green-100 rounded-md">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        
        <div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="mt-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
