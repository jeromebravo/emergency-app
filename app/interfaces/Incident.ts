import { GeoPoint } from 'firebase/firestore';

import { ProfessionCategory } from './Profession';

export interface IncidentEntryFields {
  comment: string;
  numberOfSuspects: string;
  numberOfVictims: string;
  photos: string[];
  plateNumber: string;
  professionCategories: ProfessionCategory[];
  reportedBy: string;
  suspectArmed: string;
  typeOfIncident: string;
  vehicleColor: string;
  vehicleType: string;
}

export default interface Incident extends IncidentEntryFields {
  coordinates: GeoPoint;
  createdAt: number;
  g: {
    geohash: string;
    geopoint: GeoPoint
  };
  id: string;
  status: 'ongoing' | 'done';
}