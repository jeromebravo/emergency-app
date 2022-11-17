import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GeoQuerySnapshot } from 'geofirestore-core';

import Incident from '../interfaces/Incident';
import { db } from '../config/firebase';
import { uploadPhoto } from './storage';
import { IncidentEntryFields } from '../interfaces/Incident';
import { GeoFirestore, GeoPoint } from '../config/geofirestore';
import { ProfessionCategory } from '../interfaces/Profession';

const GeoCollection = GeoFirestore.collection('Incidents');

export const createIncident = async (
  fields: IncidentEntryFields,
  location: { latitude: number; longitude: number }
) => {
  try {
    const photos = [];

    for (const photo of fields.photos) {
      const photoUrl = await uploadPhoto(photo);
      if (!photoUrl) return;
      photos.push(photoUrl);
    }

    const incidentDoc = await GeoCollection.add({
      coordinates: new GeoPoint(location.latitude, location.longitude),
      createdAt: Date.now(),
      ...fields,
      photos,
      status: 'ongoing'
    });

    setTimeout(() => {
      updateIncidentStatus(incidentDoc.id);
    }, 21600000);

    return incidentDoc.id;
    
  } catch (err) {
    console.log(err);
  }
}

export const findNearbyIncidents = (
  professionCategory: ProfessionCategory,
  location: { latitude: number, longitude: number },
  cb: (snap: GeoQuerySnapshot) => void
) => {
  GeoCollection
    .near({
      center: new GeoPoint(location.latitude, location.longitude),
      radius: 5
    })
    .where('professionCategories', 'array-contains', professionCategory)
    .where('status', '==', 'ongoing')
    .onSnapshot(cb);
}

export const getIncident = async (incidentId: string) => {
  try {
    const docRef = doc(db, 'Incidents', incidentId);
    const incidentDoc = await getDoc(docRef);
    
    return { id: incidentDoc.id, ...incidentDoc.data() } as Incident;

  } catch (err) {
    console.log(err);
    return null;
  }
}

export const updateIncidentStatus = async (incidentId: string) => {
  try {
    const docRef = doc(db, 'Incidents', incidentId);

    await updateDoc(docRef, { status: 'done' });

  } catch (err) {
    console.log(err);
  }
}