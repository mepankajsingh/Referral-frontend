import React from 'react';

export default function ReferralCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
      <div className="flex justify-between mt-4">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}
