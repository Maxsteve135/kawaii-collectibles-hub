
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getReviewsByProductId, Product, Review } from "../lib/mockData";

// Imported refactored components
import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductSkeleton from "../components/product/ProductSkeleton";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    
    const productId = parseInt(id);
    const fetchedProduct = getProductById(productId);
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      
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

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!product) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductBreadcrumb product={product} />

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-16">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} reviews={reviews} />
        </div>

        <ProductReviews reviews={reviews} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
