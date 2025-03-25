
import { X } from "lucide-react";

interface ShopActiveFiltersProps {
  categoryFilter: string | null;
  onClearCategory: () => void;
}

const ShopActiveFilters = ({ categoryFilter, onClearCategory }: ShopActiveFiltersProps) => {
  if (!categoryFilter) return null;
  
  return (
    <div className="mb-6 flex items-center space-x-2">
      <span className="text-sm text-gray-500">Active filters:</span>
      <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
        {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
        <button
          onClick={onClearCategory}
          className="ml-1 text-primary-600 hover:text-primary-800"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShopActiveFilters;
