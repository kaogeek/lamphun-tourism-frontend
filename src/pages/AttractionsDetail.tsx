import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useGetPlaceById } from '@/hooks/api/useGetPlaceById';
import { Skeleton } from '@/components/ui/skeleton';

const AttractionsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { data: placeData, isLoading, error } = useGetPlaceById(id || '');

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mt-32 mb-32 text-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !placeData) {
    return (
      <>
        <Navbar />
        <div className="container mt-32 mb-32 text-center">
          <h1 className="text-3xl font-bold">Attraction not found</h1>
          <Link to="/attractions" className="mt-4 inline-block text-primary hover:underline">
            Back to attractions
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const place = placeData.data;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? place.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      
      <div className="container mt-32 mb-16">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/attractions" className="text-primary hover:text-primary/80 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to attractions
          </Link>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image gallery */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg h-80 md:h-96 mb-4">
              {
                place.images?.length > 0 ? 
                  <img 
                    src={place.images[currentImageIndex]} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  /> : 
                  <Skeleton className="w-full h-full object-cover" />
              }
              {place.images?.length > 0 && <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>}
              
             {place.images?.length > 0 && <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>}
            </div>
            
            {place.images?.length > 0 && <div className="flex space-x-2 mb-8">
              {place.images.map((img, index) => (
                <div 
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${
                    index === currentImageIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>}
            
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-4">
                {place.name}
              </h1>
              
              <div className="whitespace-pre-line">
                {place.shortDescription}
              </div>
            </div>
          </div>
          
          {/* Right column - Details */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Information</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">
                        {place.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <div className="text-gray-600">
                        {Object.entries(place.openingHours).map(([day, hours]) => (
                          <div key={day}>
                            {hours.enabled ? (
                              <p>{day}: {hours.open} - {hours.close}</p>
                            ) : (
                              <p>{day}: Closed</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Map</h4>
                  <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                    {/* Map placeholder - would be replaced with actual map */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Interactive Map Placeholder
                    </div>
                  </div>
                  <Link to="/map" className="mt-2 text-primary hover:underline text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    View on full map
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AttractionsDetail;
