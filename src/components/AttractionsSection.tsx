import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { getPopularPlaces } from '@/lib/api/services/places';
import { Skeleton } from './ui/skeleton';
import { useQuery } from '@tanstack/react-query';

const AttractionsSection: React.FC = () => {
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['popular-places'],
    queryFn: getPopularPlaces,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">{t('attractions.title')}</h2>
          <Link to="/attractions">
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
              {t('attractions.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-52">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-8 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : data?.data?.length > 0
              ? data.data.map((attraction) => (
                  <Link to={`/attractions/${attraction.documentId}`} key={attraction.id}>
                    <Card className="overflow-hidden card-hover">
                      <div className="h-52 overflow-hidden">
                        {/* TODO: Add image */}
                        {attraction.coverImage?.url && (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_ENDPOINT}${attraction.coverImage?.url}`}
                            alt={`${attraction.name}-image`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        )}
                        {/* <img 
                      src={attraction.images[0]} 
                      alt={`${attraction.name}-image`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    /> */}
                        <Skeleton className="w-full h-full" />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <span className="inline-block bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full">
                            {attraction.placeCategory.name}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{attraction.name}</h3>
                        <p className="text-gray-500 text-sm">{attraction.shortDescription}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              : null}
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
