
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopFilterSidebarProps {
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClearFilters: () => void;
  isFiltersVisible: boolean;
  onToggleFilters: () => void;
}

const ShopFilterSidebar = ({
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
  isFiltersVisible,
  onToggleFilters,
}: ShopFilterSidebarProps) => {
  const categories = [
    { id: "all", name: "All Products" },
    { id: "poster", name: "Posters" },
    { id: "figure", name: "Figures" },
    { id: "keychain", name: "Keychains" },
    { id: "plushie", name: "Plushies" }
  ];

  return (
    <div className={`md:w-64 lg:w-72 ${isFiltersVisible ? 'block' : 'hidden'} md:block`}>
      <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
        {/* Close button - Mobile only */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button 
            onClick={onToggleFilters} 
            variant="ghost" 
            size="icon"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id === "all" ? null : category.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  (category.id === "all" && !categoryFilter) || category.id === categoryFilter
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter - Placeholder for future */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-gray-400">to</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </div>

        {/* Sort By - Desktop */}
        <div className="hidden md:block mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={onSortChange}
            className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
        </div>

        {/* Clear Filters */}
        {categoryFilter && (
          <Button 
            onClick={onClearFilters}
            variant="outline" 
            className="w-full"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShopFilterSidebar;
