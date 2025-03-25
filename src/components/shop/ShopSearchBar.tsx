
import { Search, X } from "lucide-react";

interface ShopSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ShopSearchBar = ({ searchQuery, onSearchChange }: ShopSearchBarProps) => {
  return (
    <div className="mb-6 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopSearchBar;
