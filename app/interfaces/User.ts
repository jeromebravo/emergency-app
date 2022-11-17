import { GeoPoint } from 'firebase/firestore';

import { ProfessionCategory } from './Profession';

export interface UserEntryFields {
  cellPhoneNumber: string;
  email: string;
  entityId: string | null;
  identification: string | null;
  expoPushToken: string;
  firstName: string;
  lastName: string;
  professionCategory: ProfessionCategory;
  professionName: string;
  profilePicture: string | null;
}

export interface UserWithoutCoordinates extends UserEntryFields {
  banned: boolean;
  createdAt: number;
  id: string;
  points: number;
  status: 'need help' | 'responding' | 'standby' ;
}

export default interface User extends UserWithoutCoordinates {
  coordinates: GeoPoint;
  g: {
    geohash: string;
    geopoint: GeoPoint
  };
}