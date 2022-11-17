import { GeoPoint } from 'firebase/firestore';

import { UserWithoutCoordinates } from './User';
import { ProfessionCategory } from './Profession';

export interface VictimWithoutCoordinates {
  createdAt: number;
  id: string;
  professionCategories: ProfessionCategory[];
  status: 'ongoing' | 'done';
  victim: UserWithoutCoordinates;
}

export default interface Victim extends VictimWithoutCoordinates {
  coordinates: GeoPoint;
  g: {
    geohash: string;
    geopoint: GeoPoint
  };
}