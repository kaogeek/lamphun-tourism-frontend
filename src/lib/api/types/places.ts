import { BlocksContent } from '@strapi/blocks-react-renderer';
import { FileUpload } from './entity';
import { MetaResponseBody } from './meta';
import { PlaceCategory } from './place-categories';

export type Place = {
  id: string;
  documentId: string;
  slug: string;
  name: string;
  description: BlocksContent;
  shortDescription: string;
  address: string;
  lat: number;
  lng: number;
  placeImages: FileUpload[];
  coverImage?: FileUpload;
  placeCategory?: PlaceCategory;
  openingHours: Record<string, PlaceOpeningHours>;
  popular: true;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: Place[];
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
