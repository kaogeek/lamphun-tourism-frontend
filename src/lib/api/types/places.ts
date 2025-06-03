import { MetaResponseBody } from "./meta";

export type Place = {
  id: string;
  documentId: string;
  name: string;
  shortDescription: string;
  address: string;
  lat: number;
  lng: number;
  locale: string;
  images?: string[];
  coverImage?: {
    url: string;
  };
  openingHours: Record<string, PlaceOpeningHours>;
  popular: true;
  createdAt: string;
  updatedAt: string;
};

export type PlaceOpeningHours = {
  open: string;
  close: string;
  enabled: boolean;
};

export type GetPlacesResponse = {
  data: Place[];
  meta: MetaResponseBody;
};

export type GetPlaceByIdResponse = {
  data: Place;
};
