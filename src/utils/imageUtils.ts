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

// Custom anime images organized by category for better distribution
export const CUSTOM_ANIME_IMAGES_BY_CATEGORY = {
  poster: [
    "/lovable-uploads/9aa54037-3944-4d19-95c5-ef0399eca2a0.png",  // Kakashi poster
    "/lovable-uploads/da7ed99c-f587-4176-b923-ff3757ed8b3c.png",  // One Piece poster
    "/lovable-uploads/f98aafec-5396-4981-8ee2-6aa8bea970e6.png"   // Demon Slayer poster
  ],
  figure: [
    "/lovable-uploads/c5bf4ba3-74bc-46d3-ba9b-705c0f4c8602.png",  // No-Face figure
    "/lovable-uploads/672fea40-0270-4a61-a7b0-4965106a0fa0.png"   // Attack on Titan figure
  ],
  keychain: [
    "/lovable-uploads/b147f7c9-efc8-41d2-83f4-e0f0f2397e8d.png"   // Deku keychain
  ],
  plushie: [
    "/lovable-uploads/c5bf4ba3-74bc-46d3-ba9b-705c0f4c8602.png"   // No-Face plushie
  ]
};

// For backwards compatibility
export const CUSTOM_ANIME_IMAGES = [
  ...CUSTOM_ANIME_IMAGES_BY_CATEGORY.figure,
  ...CUSTOM_ANIME_IMAGES_BY_CATEGORY.poster,
  ...CUSTOM_ANIME_IMAGES_BY_CATEGORY.keychain,
  ...CUSTOM_ANIME_IMAGES_BY_CATEGORY.plushie
];

// Keep track of which images have been assigned to prevent duplication when possible
const assignedImages = new Map<string, Set<number>>();

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
  if (product.useCustomImages) {
    return getUniqueCategoryImage(product);
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
 * Gets a unique image for a product based on its category
 * @param product The product to assign an image to
 * @returns A unique image URL when possible
 */
const getUniqueCategoryImage = (product: Product): string => {
  const category = product.category;
  const productId = product.id;
  
  // Initialize the assignment tracking for this category if needed
  if (!assignedImages.has(category)) {
    assignedImages.set(category, new Set<number>());
  }
  
  const categoryImages = CUSTOM_ANIME_IMAGES_BY_CATEGORY[category];
  const assignedForCategory = assignedImages.get(category)!;
  
  // If we're running low on unique images, we'll need to reuse some
  if (assignedForCategory.size >= categoryImages.length) {
    // Use a deterministic but seemingly random distribution based on product ID
    const imageIndex = productId % categoryImages.length;
    return categoryImages[imageIndex];
  }
  
  // Find an unassigned image for this category
  for (let i = 0; i < categoryImages.length; i++) {
    // Use a different starting point based on product ID to distribute variety
    const startIdx = productId % categoryImages.length;
    const idx = (startIdx + i) % categoryImages.length;
    
    // Check if this particular product has been assigned this image already
    const imageKey = `${category}-${idx}`;
    if (!assignedForCategory.has(idx)) {
      assignedForCategory.add(idx);
      return categoryImages[idx];
    }
  }
  
  // Fallback to category-based image if all are assigned
  return DEFAULT_CATEGORY_IMAGES[category];
};

/**
 * Assigns the most appropriate custom anime image based on product properties
 * This is maintained for backward compatibility
 * @param product The product to assign an image to
 * @returns An appropriate image URL
 */
export const getAppropriateAnimeImage = (product: Product): string => {
  return getUniqueCategoryImage(product);
};
