
import { useState } from "react";
import { Product, Review } from "../../lib/mockData";
import { useCart } from "../../context/CartContext";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductInfoProps {
  product: Product;
  reviews: Review[];
}

const ProductInfo = ({ product, reviews }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock || 10, quantity + change));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="md:w-1/2">
      <div className="mb-2">
        <span className="text-sm text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-500">
          {product.rating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
        </span>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-1">
          Including all taxes
        </p>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="mb-6">
        <p className={`text-sm font-medium ${
          product.stock > 0 
            ? "text-green-600" 
            : "text-red-600"
        }`}>
          {product.stock > 0 
            ? `In Stock (${product.stock} ${product.stock === 1 ? 'item' : 'items'} left)` 
            : "Out of Stock"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <Minus size={18} />
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-grow py-6"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
