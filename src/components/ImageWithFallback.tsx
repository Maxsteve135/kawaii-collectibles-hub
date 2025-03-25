
import { useState, useEffect } from "react";
import { handleImageError, PLACEHOLDER_IMAGE } from "../utils/imageUtils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: "poster" | "figure" | "keychain" | "plushie";
  priority?: boolean;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = PLACEHOLDER_IMAGE, 
  category,
  priority = false,
  className,
  ...props 
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  // Update imageSrc if src prop changes
  useEffect(() => {
    setImageSrc(src);
    setError(false);
    setLoaded(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      setError(true);
      handleImageError(e, category);
      // If using the fallback, mark as loaded
      setLoaded(true);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
      )}
      
      <img
        src={error ? fallbackSrc : imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
