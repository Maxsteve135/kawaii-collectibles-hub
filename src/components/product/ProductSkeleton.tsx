
const ProductSkeleton = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2 space-y-4">
            <div className="bg-gray-200 rounded-xl aspect-square"></div>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg w-20 h-20"></div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
