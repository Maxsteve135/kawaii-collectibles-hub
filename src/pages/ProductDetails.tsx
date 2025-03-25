import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getReviewsByProductId, Product, Review } from "../lib/mockData";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Minus,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "../components/ProductCard";
import ImageWithFallback from "../components/ImageWithFallback";
import { getSafeImageUrl } from "../utils/imageUtils";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    
    const productId = parseInt(id);
    const fetchedProduct = getProductById(productId);
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setCurrentImageIndex(0);
      
      const fetchedReviews = getReviewsByProductId(productId);
      setReviews(fetchedReviews);
      
      const related = getProductById(productId)?.category 
        ? getProductById(productId)!.category 
        : "";
      
      import("../lib/mockData").then(({ products }) => {
        const filtered = products
          .filter(p => p.category === related && p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(filtered);
      });
    } else {
      navigate("/404");
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [id, navigate]);

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

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product?.stock || 10, quantity + change));
    setQuantity(newQuantity);
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="md:w-1/2 space-y-4">
              <div className="bg-gray-200 rounded-xl aspect-square"></div>
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg w-20 h-20"></div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-primary-600 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/shop" className="text-gray-500 hover:text-primary-600 transition-colors">
                Shop
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href={`/shop?category=${product.category}`} className="text-gray-500 hover:text-primary-600 transition-colors capitalize">
                {product.category}s
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-16">
          <div className="md:w-1/2">
            <div className="relative mb-4 rounded-xl overflow-hidden bg-white aspect-square">
              <ImageWithFallback
                src={getSafeImageUrl(product, currentImageIndex)}
                alt={product.name}
                category={product.category}
                className="w-full h-full object-contain"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary-600 opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    category={product.category}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

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
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-start">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-semibold mr-2">{review.userName}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? "currentColor" : "none"}
                              className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
