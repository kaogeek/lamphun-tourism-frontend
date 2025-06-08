import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import EmptyState from '@/components/state/EmptyState';
import ErrorState from '@/components/state/ErrorState';
import LoadingState from '@/components/state/LoadingState';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeCategoriesQueryConfig } from '@/hooks/api/useGetPlaceCategories';
import { placesQueryConfig } from '@/hooks/api/useGetPlaces';
import { FindParams } from '@/lib/api/types/find';
import { PlaceCategory } from '@/lib/api/types/place-categories';
import { Place } from '@/lib/api/types/places';
import { resolveUrl } from '@/lib/file-upload';
import { getTranslateWithFallback } from '@/lib/i18n';
import { useQueries } from '@tanstack/react-query';
import { MapPin, Search } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map, { MapRef, Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';

const useCategoryAndPlace = (placeCategoryParams?: FindParams, placeParams?: FindParams) => {
  const {
    i18n: { language },
  } = useTranslation();

  const results = useQueries({
    queries: [placeCategoriesQueryConfig(placeCategoryParams), placesQueryConfig(placeParams)],
  });

  const [categoryQuery, placeQuery] = results;

  const translatedCategories = useMemo(() => {
    return (categoryQuery.data?.data ?? []).map((c) => getTranslateWithFallback(c, language));
  }, [categoryQuery.data?.data, language]);

  const translatedPlaces = useMemo(() => {
    return (placeQuery.data?.data ?? []).map((p) => getTranslateWithFallback(p, language));
  }, [placeQuery.data?.data, language]);

  return {
    categories: translatedCategories,
    places: translatedPlaces,
    isLoading: categoryQuery.isLoading || placeQuery.isLoading,
    error: categoryQuery.error || placeQuery.error,
  };
};

const INITIAL_VIEW_STATE = {
  longitude: 98.93273443954536,
  latitude: 18.09850631134027,
  zoom: 8,
};

const PlaceCard = ({
  place,
  selected,
  onSelect,
}: {
  place: Place;
  selected: Place | null;
  onSelect: (place: Place) => void;
}) => (
  <Card
    className={`cursor-pointer hover:bg-primary/5 transition-colors ${
      selected?.documentId === place.documentId ? 'border-primary bg-primary/10' : ''
    }`}
    onClick={() => onSelect(place)}
  >
    <CardContent className="p-3">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 shrink-0 overflow-hidden rounded-md">
          <img src={resolveUrl(place.coverImage?.url)} alt={place.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-sm line-clamp-1">{place.name}</h4>
          <p className="text-xs text-gray-500 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {place.address}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PlaceMap: React.FC = () => {
  const { categories, places, isLoading, error } = useCategoryAndPlace(
    {
      populate: {
        localizations: true,
      },
    },
    {
      populate: {
        coverImage: true,
        placeCategory: true,
        localizations: {
          populate: {
            coverImage: true,
            placeCategory: true,
          },
        },
      },
    }
  );
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [popupInfo, setPopupInfo] = useState<Place | null>(null);
  const mapRef = useRef<MapRef>(null);
  const filteredPlaces = useMemo(() => {
    if (!places) return [];

    return places
      .filter((place) => {
        if (selectedCategory) {
          return place.placeCategory?.documentId === selectedCategory.documentId;
        }
        return true;
      })
      .filter((place) => {
        if (searchTerm.trim() === '') return true;
        const lowerSearch = searchTerm.toLowerCase();
        return place.name.toLowerCase().includes(lowerSearch);
      });
  }, [places, selectedCategory, searchTerm]);

  useEffect(() => {
    resetFocus();
  }, [filteredPlaces]);

  const resetFocus = () => {
    const current = mapRef.current;

    if (!current || filteredPlaces.length === 0) {
      return;
    }

    setPopupInfo(null);

    const bounds = new maplibregl.LngLatBounds();

    if (filteredPlaces.length === 1) {
      const { lat, lng } = filteredPlaces[0];
      mapRef.current?.flyTo({
        center: { lat, lng },
        zoom: 14,
        duration: 1000,
      });

      return;
    }

    filteredPlaces.forEach((place) => {
      bounds.extend({ lng: place.lng, lat: place.lat });
    });

    current.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    });
  };

  const handleSelectCategory = (documentId: string) => {
    const targetCategory = categories.find((category) => category.documentId === documentId);
    setSelectedCategory(targetCategory);
  };

  const handleSelectPlace = (place: Place) => {
    setSelectedLocation(place);
    handleSelectMarker(place);

    const { lat, lng } = place;

    mapRef.current?.flyTo({
      center: { lat, lng },
      zoom: 14,
      duration: 1000,
    });
  };

  const handleSelectMarker = (place: Place) => {
    setPopupInfo(place);
    setSelectedLocation(place);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-2 bg-primary/5"></div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : (
        <section className="py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-1/3 order-2 lg:order-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    {/* Search */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder={t('map.placeHolders.searchTerm')}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">{t('map.label.categories')}</h3>
                      <Tabs
                        value={selectedCategory?.documentId ?? null}
                        onValueChange={(value) => handleSelectCategory(value)}
                        className="w-full"
                      >
                        <TabsList className="flex flex-wrap h-auto bg-muted/50 p-1 mb-4">
                          <TabsTrigger
                            key={null}
                            value={null}
                            className="flex-1 min-w-[80px] h-8 data-[state=active]:bg-white"
                          >
                            {t('common.buttons.allCategory')}
                          </TabsTrigger>
                          {categories.map((category) => (
                            <TabsTrigger
                              key={category.documentId}
                              value={category.documentId}
                              className="flex-1 min-w-[80px] h-8 data-[state=active]:bg-white"
                            >
                              {category.name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Location List */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        {t('map.label.locations')} ({filteredPlaces.length})
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {filteredPlaces.map((place) => (
                          <PlaceCard
                            place={place}
                            key={place.id}
                            selected={selectedLocation}
                            onSelect={handleSelectPlace}
                          />
                        ))}

                        {filteredPlaces.length === 0 && (
                          <EmptyState
                            title={t('map.empty.title')}
                            msg={t('map.empty.msgCategorySelect')}
                            size="sm"
                            icon={<MapPin />}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="lg:w-2/3 order-1 lg:order-2">
                <div className="w-full h-[600px] rounded-lg shadow-lg">
                  <Map
                    ref={mapRef}
                    {...viewState}
                    onLoad={() => {
                      if (filteredPlaces.length > 0) {
                        resetFocus();
                      }
                    }}
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle={{
                      version: 8,
                      sources: {
                        osm: {
                          type: 'raster',
                          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                          tileSize: 256,
                          attribution: '© OpenStreetMap contributors',
                        },
                      },
                      layers: [
                        {
                          id: 'osm-tiles',
                          type: 'raster',
                          source: 'osm',
                          minzoom: 0,
                          maxzoom: 19,
                        },
                      ],
                    }}
                  >
                    <NavigationControl position="top-right" />

                    {filteredPlaces.map((attraction) => (
                      <Marker
                        key={attraction.id}
                        longitude={attraction.lng}
                        latitude={attraction.lat}
                        anchor="bottom"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.originalEvent.stopPropagation();
                          handleSelectMarker(attraction);
                        }}
                      />
                    ))}

                    {popupInfo && (
                      <Popup
                        longitude={popupInfo.lng}
                        latitude={popupInfo.lat}
                        anchor="bottom"
                        offset={60}
                        onClose={() => setPopupInfo(null)}
                      >
                        <div className="p-2">
                          <h3 className="font-bold">{popupInfo.name}</h3>
                          <p>{popupInfo.shortDescription}</p>
                        </div>
                      </Popup>
                    )}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default PlaceMap;
