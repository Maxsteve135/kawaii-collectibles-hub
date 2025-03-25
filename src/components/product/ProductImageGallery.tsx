
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../lib/mockData";
import ImageWithFallback from "../ImageWithFallback";
import { getSafeImageUrl } from "../../utils/imageUtils";

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  return (
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
  );
};

export default ProductImageGallery;
