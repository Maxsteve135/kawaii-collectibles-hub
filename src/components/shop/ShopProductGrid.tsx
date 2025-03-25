
import { Product } from "../../lib/mockData";
import ProductCard from "../ProductCard";
import { Button } from "@/components/ui/button";

interface ShopProductGridProps {
  products: Product[];
  isLoading: boolean;
  onClearFilters: () => void;
}

const ShopProductGrid = ({ products, isLoading, onClearFilters }: ShopProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl aspect-[3/4] mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <Button onClick={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopProductGrid;
