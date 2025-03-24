
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products, Product } from "../lib/mockData";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";

const Shop = () => {
  const location = useLocation();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get the category from URL params when the page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    
    if (category) {
      setCategoryFilter(category);
    } else {
      setCategoryFilter(null);
    }

    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.search]);

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setDisplayedProducts(filtered);
  }, [categoryFilter, searchQuery, sortBy, products]);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "poster", name: "Posters" },
    { id: "figure", name: "Figures" },
    { id: "keychain", name: "Keychains" },
    { id: "plushie", name: "Plushies" }
  ];

  const handleCategoryClick = (category: string | null) => {
    setCategoryFilter(category);
    // Close filter panel on mobile after selection
    if (window.innerWidth < 768) {
      setIsFiltersVisible(false);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setCategoryFilter(null);
    setSearchQuery("");
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop Anime Merchandise</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our collection of premium anime posters, figures, and more.
            All items are officially licensed and ship directly from our warehouse in India.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <Button 
            onClick={toggleFilters}
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
              onChange={handleSortChange}
              className="text-sm border rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className={`md:w-64 lg:w-72 ${isFiltersVisible ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              {/* Close button - Mobile only */}
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button 
                  onClick={toggleFilters} 
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
                      onClick={() => handleCategoryClick(category.id === "all" ? null : category.id)}
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
                  onChange={handleSortChange}
                  className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(categoryFilter || searchQuery) && (
                <Button 
                  onClick={clearFilters}
                  variant="outline" 
                  className="w-full"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {categoryFilter && (
              <div className="mb-6 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-500">
                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'result' : 'results'}
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
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
            ) : displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
