import { GeoPoint } from 'firebase/firestore';

import { UserWithoutCoordinates } from './User';

export interface ResponderWithoutCoordinates {
  createdAt: number;
  id: string;
  incidentId: string | null;
  status: 'acknowledged' | 'done' | 'cancelled';
  responder: UserWithoutCoordinates;
  victimId: string | null;
}

export default interface Responder extends ResponderWithoutCoordinates {
  coordinates: GeoPoint;
  g: {
    geohash: string;
    geopoint: GeoPoint
  };
}