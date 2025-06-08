import maplibregl from 'maplibre-gl';
import { useRef, useState } from 'react';
import Map, { MapRef, Marker, NavigationControl, Popup, ViewState } from 'react-map-gl/maplibre';

type Place = {
  id: string;
  name: string;
  shortDescription?: string;
  lat: number;
  lng: number;
};

type MapViewProps = {
  places: Place[];
  initialViewState: ViewState;
};

export default function MapView({ places, initialViewState }: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(initialViewState);
  const [popupInfo, setPopupInfo] = useState<Place | null>(null);

  const resetFocus = () => {
    const current = mapRef.current;

    if (!current || places.length === 0) {
      return;
    }

    setPopupInfo(null);

    const bounds = new maplibregl.LngLatBounds();

    if (places.length === 1) {
      const { lat, lng } = places[0];
      mapRef.current?.flyTo({
        center: { lat, lng },
        zoom: 14,
        duration: 1000,
      });

      return;
    }

    places.forEach((place) => {
      bounds.extend({ lng: place.lng, lat: place.lat });
    });

    current.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    });
  };

  const handleSelectMarker = (place: Place) => {
    setPopupInfo(place);
  };

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      onLoad={() => {
        if (places.length > 0) {
          resetFocus();
        }
      }}
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

      {places.map((place) => (
        <Marker
          key={place.id}
          longitude={place.lng}
          latitude={place.lat}
          anchor="bottom"
          className="cursor-pointer"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleSelectMarker(place);
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
  );
}
