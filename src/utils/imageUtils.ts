
import { Product } from "../lib/mockData";

// Default placeholder image
export const PLACEHOLDER_IMAGE = "/lovable-uploads/f98aafec-5396-4981-8ee2-6aa8bea970e6.png";

// Default category images
export const DEFAULT_CATEGORY_IMAGES = {
  poster: "/lovable-uploads/9aa54037-3944-4d19-95c5-ef0399eca2a0.png",
  figure: "/lovable-uploads/c5bf4ba3-74bc-46d3-ba9b-705c0f4c8602.png",
  keychain: "/lovable-uploads/b147f7c9-efc8-41d2-83f4-e0f0f2397e8d.png",
  plushie: "/lovable-uploads/da7ed99c-f587-4176-b923-ff3757ed8b3c.png"
};

// Custom anime images (using uploaded images)
export const CUSTOM_ANIME_IMAGES = [
  "/lovable-uploads/c5bf4ba3-74bc-46d3-ba9b-705c0f4c8602.png", // No-Face figure
  "/lovable-uploads/9aa54037-3944-4d19-95c5-ef0399eca2a0.png", // Kakashi poster
  "/lovable-uploads/da7ed99c-f587-4176-b923-ff3757ed8b3c.png", // One Piece poster
  "/lovable-uploads/b147f7c9-efc8-41d2-83f4-e0f0f2397e8d.png", // Deku keychain
  "/lovable-uploads/672fea40-0270-4a61-a7b0-4965106a0fa0.png", // Attack on Titan figure
  "/lovable-uploads/f98aafec-5396-4981-8ee2-6aa8bea970e6.png"  // Demon Slayer poster
];

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
  
  // Add loading animation class
  img.classList.add('image-fade-in');
};

/**
 * Gets a safe image URL with fallbacks for a product
 * @param product The product
 * @param index Optional index for product.images array
 * @returns A safe image URL
 */
export const getSafeImageUrl = (product: Product, index?: number): string => {
  // If custom images are available for this product
  if (product.useCustomImages && CUSTOM_ANIME_IMAGES.length > 0) {
    // Use product ID to assign a consistent custom image
    const imageIndex = product.id % CUSTOM_ANIME_IMAGES.length;
    return CUSTOM_ANIME_IMAGES[imageIndex];
  }
  
  if (index !== undefined && product.images && product.images[index]) {
    return product.images[index];
  }
  
  if (product.mainImage) {
    return product.mainImage;
  }
  
  return DEFAULT_CATEGORY_IMAGES[product.category] || PLACEHOLDER_IMAGE;
};

/**
 * Assigns the most appropriate custom anime image based on product properties
 * @param product The product to assign an image to
 * @returns An appropriate image URL
 */
export const getAppropriateAnimeImage = (product: Product): string => {
  const name = product.name.toLowerCase();
  
  // Match products with specific anime themes
  if (name.includes('spirited away') || name.includes('ghibli') || name.includes('no face')) {
    return CUSTOM_ANIME_IMAGES[0]; // No-Face figure
  }
  
  if (name.includes('naruto') || name.includes('kakashi') || name.includes('ninja')) {
    return CUSTOM_ANIME_IMAGES[1]; // Kakashi poster
  }
  
  if (name.includes('one piece') || name.includes('luffy') || name.includes('pirate')) {
    return CUSTOM_ANIME_IMAGES[2]; // One Piece poster
  }
  
  if (name.includes('my hero') || name.includes('deku') || name.includes('academia')) {
    return CUSTOM_ANIME_IMAGES[3]; // Deku keychain
  }
  
  if (name.includes('attack on titan') || name.includes('levi') || name.includes('scout')) {
    return CUSTOM_ANIME_IMAGES[4]; // Attack on Titan figure
  }
  
  if (name.includes('demon slayer') || name.includes('kimetsu') || name.includes('tanjiro')) {
    return CUSTOM_ANIME_IMAGES[5]; // Demon Slayer poster
  }
  
  // If no match is found, assign based on category
  switch (product.category) {
    case 'figure':
      return product.id % 2 === 0 ? CUSTOM_ANIME_IMAGES[0] : CUSTOM_ANIME_IMAGES[4];
    case 'poster':
      return product.id % 3 === 0 ? CUSTOM_ANIME_IMAGES[1] : 
             product.id % 3 === 1 ? CUSTOM_ANIME_IMAGES[2] : CUSTOM_ANIME_IMAGES[5];
    case 'keychain':
      return CUSTOM_ANIME_IMAGES[3];
    case 'plushie':
      return CUSTOM_ANIME_IMAGES[0];
    default:
      // Use modulo to get a consistent but varied image
      return CUSTOM_ANIME_IMAGES[product.id % CUSTOM_ANIME_IMAGES.length];
  }
};
