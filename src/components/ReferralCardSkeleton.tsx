export default function ReferralCardSkeleton() {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="mr-3 w-10 h-10 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        <div className="mt-3 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-1 h-4 bg-gray-200 rounded w-3/4"></div>
        
        <div className="mt-3 space-y-2">
          <div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="mt-1 flex">
              <div className="bg-gray-200 h-8 rounded w-full"></div>
              <div className="ml-2 bg-gray-200 h-8 w-16 rounded"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="mt-1 h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="mt-1 h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="h-8 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}
