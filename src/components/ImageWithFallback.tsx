
import { useState } from "react";
import { handleImageError, PLACEHOLDER_IMAGE } from "../utils/imageUtils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: "poster" | "figure" | "keychain" | "plushie";
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = PLACEHOLDER_IMAGE, 
  category,
  className,
  ...props 
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      setError(true);
      handleImageError(e, category);
    }
  };

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default ImageWithFallback;
