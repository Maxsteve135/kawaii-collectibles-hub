
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../lib/mockData";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get featured products (just use first 4 for this demo)
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Featured Collection
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular This Season
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after anime collectibles, handpicked for the true fans.
          </p>
        </div>

        {/* Products Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              style={{ 
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)"
              }}
              className="transition-all duration-700"
            >
              <ProductCard product={product} featured={true} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link to="/shop">
            <Button variant="outline" className="rounded-full border-primary-600 text-primary-600 hover:bg-primary-50">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
