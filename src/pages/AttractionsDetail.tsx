import OpeningHoursDisplay from '@/components/date/OpeningHoursDisplay';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import MapView from '@/components/map/MapView';
import Navbar from '@/components/Navbar';
import EmptyState from '@/components/state/EmptyState';
import ErrorState from '@/components/state/ErrorState';
import LoadingState from '@/components/state/LoadingState';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetPlaces } from '@/hooks/api/useGetPlaces';
import { resolveUrl } from '@/lib/file-upload';
import { getTranslateWithFallback } from '@/lib/i18n';
import { INITIAL_VIEW_STATE } from '@/lib/map-config';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { t } from 'i18next';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const AttractionsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    i18n: { language },
  } = useTranslation();

  const { data, isLoading, error } = useGetPlaces({
    filters: {
      slug: {
        $eq: id,
      },
    },
    populate: {
      placeCategory: true,
      coverImage: true,
      placeImages: true,
      localizations: {
        populate: {
          placeCategory: true,
          coverImage: true,
          placeImages: true,
        },
      },
    },
  });

  return (
    <>
      <Navbar />
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : (
        (() => {
          const items = data?.data ?? [];

          if (!items.length) {
            return (
              <EmptyState
                title={t('attractions.empty.title')}
                msg={t('attractions.empty.msg')}
                action={
                  <Link to="/events">
                    <Button>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t('attractions.buttons.back')}
                    </Button>
                  </Link>
                }
              />
            );
          }

          const place = getTranslateWithFallback(items[0], language, ['slug']);

          return (
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
                  <ImageSlider
                    images={place.placeImages?.map((image) => ({
                      ...image,
                      url: resolveUrl(image.url),
                    }))}
                  />

                  <div className="prose max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{place.name}</h1>

                    <div className="whitespace-pre-line">
                      <BlocksRenderer content={place.description} />
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
                            <p className="text-gray-600">{place.address}</p>
                          </div>
                        </div>

                        <div className="flex">
                          <Clock className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">Opening Hours</p>
                            <OpeningHoursDisplay openingHours={place.openingHours} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Map</h4>
                        <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                          <MapView
                            places={[
                              {
                                id: place.documentId,
                                name: place.name,
                                shortDescription: place.shortDescription,
                                lat: place.lat,
                                lng: place.lng,
                              },
                            ]}
                            initialViewState={INITIAL_VIEW_STATE}
                          />
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
          );
        })()
      )}

      <Footer />
    </>
  );
};

export default AttractionsDetail;
