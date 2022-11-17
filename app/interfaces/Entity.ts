import { GeoPoint } from 'firebase/firestore';

export interface EntityEntryFields {
  contactNumber: string;
  contactPerson: string;
  email: string;
  entityAddress: string;
  entityName: string;
  entityType: string;
}

export interface EntityWithoutCoordinates extends EntityEntryFields {
  createdAt: number
  id: string;
}

export default interface Entity extends EntityWithoutCoordinates {
  coordinates: GeoPoint;
  g: {
    geohash: string;
    geopoint: GeoPoint
  };
}