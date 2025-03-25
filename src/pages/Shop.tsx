
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products, Product } from "../lib/mockData";

// Components
import ShopFilterSidebar from "../components/shop/ShopFilterSidebar";
import ShopSearchBar from "../components/shop/ShopSearchBar";
import ShopActiveFilters from "../components/shop/ShopActiveFilters";
import ShopMobileToolbar from "../components/shop/ShopMobileToolbar";
import ShopResultsCount from "../components/shop/ShopResultsCount";
import ShopProductGrid from "../components/shop/ShopProductGrid";

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

        {/* Mobile Filter Toggle & Sort */}
        <ShopMobileToolbar 
          categoryFilter={categoryFilter}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onToggleFilters={toggleFilters}
        />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <ShopFilterSidebar
            categoryFilter={categoryFilter}
            onCategoryChange={handleCategoryClick}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onClearFilters={clearFilters}
            isFiltersVisible={isFiltersVisible}
            onToggleFilters={toggleFilters}
          />

          {/* Products */}
          <div className="flex-1">
            {/* Search Bar */}
            <ShopSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Active Filters */}
            <ShopActiveFilters 
              categoryFilter={categoryFilter}
              onClearCategory={() => setCategoryFilter(null)}
            />

            {/* Results Count */}
            <ShopResultsCount count={displayedProducts.length} />

            {/* Product Grid */}
            <ShopProductGrid 
              products={displayedProducts}
              isLoading={isLoading}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
