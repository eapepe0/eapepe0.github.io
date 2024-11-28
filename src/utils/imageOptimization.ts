import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

export const getOptimizedImageUrl = (url: string, maxWidth = 800) => {
  // Para Unsplash se puede usar su propia optimizacion
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${maxWidth}&q=80`;
  }
  return url;
};

export const useImageDimensions = (imageUrl: string): ImageDimensions | null => {
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height
      });
    };
  }, [imageUrl]);

  return dimensions;
};