
import { Product } from "../lib/mockData";

// Default placeholder image
export const PLACEHOLDER_IMAGE = "https://www.shutterstock.com/image-vector/coming-soon-banner-design-bright-260nw-1457836158.jpg";

// Default category images
export const DEFAULT_CATEGORY_IMAGES = {
  poster: "https://www.shutterstock.com/image-photo/anime-posters-manga-on-display-260nw-1951830210.jpg",
  figure: "https://www.shutterstock.com/image-photo/hong-kong-march-2-2019-260nw-1333711843.jpg",
  keychain: "https://www.shutterstock.com/image-photo/minsk-belarus-january-23-2021-260nw-1901562752.jpg",
  plushie: "https://www.shutterstock.com/image-photo/plush-toy-kaonashi-no-face-260nw-1902244069.jpg"
};

/**
 * Handles image loading errors by providing fallbacks
 * @param event The error event
 * @param category Optional product category for category-specific fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: "poster" | "figure" | "keychain" | "plushie"
) => {
  const img = event.currentTarget;
  
  // First try category-specific image if category is provided
  if (category && DEFAULT_CATEGORY_IMAGES[category]) {
    img.src = DEFAULT_CATEGORY_IMAGES[category];
    // Add a second error handler in case the category default also fails
    img.onerror = () => {
      img.src = PLACEHOLDER_IMAGE;
      img.onerror = null; // Prevent infinite loop
    };
  } else {
    // Directly use placeholder if no category
    img.src = PLACEHOLDER_IMAGE;
    img.onerror = null; // Prevent infinite loop
  }
};

/**
 * Gets a safe image URL with fallbacks for a product
 * @param product The product
 * @param index Optional index for product.images array
 * @returns A safe image URL
 */
export const getSafeImageUrl = (product: Product, index?: number): string => {
  if (index !== undefined && product.images[index]) {
    return product.images[index];
  }
  
  if (product.mainImage) {
    return product.mainImage;
  }
  
  return DEFAULT_CATEGORY_IMAGES[product.category] || PLACEHOLDER_IMAGE;
};
