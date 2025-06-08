import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

type Image = {
  url: string;
};

type ImageSliderProps = {
  images: Image[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="w-full">
      {/* Main Image with Controls */}
      <div className="relative overflow-hidden rounded-lg h-80 md:h-96 mb-4">
        {images?.length > 0 ? (
          <img src={images[currentImageIndex].url} className="w-full h-full object-cover" />
        ) : (
          <Skeleton className="w-full h-full object-cover" />
        )}

        {/* Prev Button */}
        {images?.length > 0 && currentImageIndex > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Next Button */}
        {images?.length > 0 && currentImageIndex < images.length - 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Thumbnails */}
      {images?.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto mb-8">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${
                index === currentImageIndex ? 'ring-2 ring-primary' : ''
              }`}
            >
              <img src={img.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
