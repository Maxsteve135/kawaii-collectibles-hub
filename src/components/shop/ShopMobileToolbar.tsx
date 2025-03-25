
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShopMobileToolbarProps {
  categoryFilter: string | null;
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onToggleFilters: () => void;
}

const ShopMobileToolbar = ({ 
  categoryFilter, 
  sortBy, 
  onSortChange, 
  onToggleFilters 
}: ShopMobileToolbarProps) => {
  return (
    <div className="md:hidden mb-4 flex justify-between items-center">
      <Button 
        onClick={onToggleFilters}
        variant="outline" 
        size="sm"
        className="flex items-center gap-2"
      >
        <Filter size={16} />
        Filters
        {categoryFilter && <span className="ml-1 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">1</span>}
      </Button>
      
      <div className="flex items-center gap-2">
        <label htmlFor="mobile-sort" className="text-sm text-gray-500">Sort:</label>
        <select
          id="mobile-sort"
          value={sortBy}
          onChange={onSortChange}
          className="text-sm border rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ShopMobileToolbar;
