import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedImageUrl, useImageDimensions } from '../utils/imageOptimization';

interface ImagePreviewProps {
  imageUrl: string;
  projectName: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, projectName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const optimizedUrl = getOptimizedImageUrl(imageUrl);
  const dimensions = useImageDimensions(optimizedUrl);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <img
            src={optimizedUrl}
            alt={projectName}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={(e) => {
              e.currentTarget.src = getOptimizedImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c');
              setIsLoading(false);
            }}
            style={{
              maxHeight: dimensions ? '80vh' : undefined,
              objectFit: 'contain'
            }}
          />
          
          <div className="p-4">
            <h3 className="text-xl font-bold dark:text-white">{projectName}</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};