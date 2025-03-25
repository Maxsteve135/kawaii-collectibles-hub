
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../lib/mockData";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ImageWithFallback from "./ImageWithFallback";
import { getSafeImageUrl, getAppropriateAnimeImage } from "../utils/imageUtils";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Determine the best image to show
  const productImage = product.useCustomImages 
    ? getAppropriateAnimeImage(product) 
    : getSafeImageUrl(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl bg-white transition-all duration-300",
        featured ? "shadow-lg hover:shadow-xl" : "hover-card",
        "product-card"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        {/* Product Image with Error Handling */}
        <ImageWithFallback
          src={productImage}
          alt={product.name}
          category={product.category}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
          priority={featured}
        />

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-white/90 hover:bg-white backdrop-blur-sm text-primary-600 border-0 transition-all"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>

        {/* Stock Status */}
        {product.stock <= 10 && (
          <div className="absolute top-3 right-3 bg-secondary-200 text-secondary-800 text-xs font-medium px-2 py-1 rounded-full animate-pulse">
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
