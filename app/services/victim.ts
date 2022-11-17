import { GeoQuerySnapshot } from 'geofirestore-core';
import { LocationObjectCoords } from 'expo-location';
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  query,
  QuerySnapshot,
  updateDoc,
  where
} from 'firebase/firestore';

import { db } from '../config/firebase';
import { GeoFirestore, GeoPoint } from '../config/geofirestore';
import { ProfessionCategory } from '../interfaces/Profession';
import { UserWithoutCoordinates } from '../interfaces/User';

const Collection = collection(db, 'Victims');
const GeoCollection = GeoFirestore.collection('Victims');

export const createVictim = async (
  victim: UserWithoutCoordinates,
  professionCategories: ProfessionCategory[],
  location: { latitude: number, longitude: number }
) => {
  try {
    const victimDoc = await GeoCollection.add({
      coordinates: new GeoPoint(location.latitude, location.longitude),
      createdAt: Date.now(),
      professionCategories,
      status: 'ongoing',
      victim
    });

    return victimDoc.id;

  } catch (err) {
    console.log(err);
  }
}

export const findNearbyVictims = (
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

export const findVictim = (
  uid: string,
  cb: (snap: QuerySnapshot<DocumentData>) => void
) => {
  const q = query(
    Collection,
    where('victim.id', '==', uid),
    where('status', '==', 'ongoing')
  );

  return onSnapshot(q, cb);
}

export const getVictim = (
  victimId: string,
  cb: (snap: DocumentSnapshot<DocumentData>) => void
) => {
  return onSnapshot(doc(db, 'Victims', victimId), cb);
}

export const updateVictimLocation = async (
  victimId: string,
  location: LocationObjectCoords
) => {
  try {
    await GeoCollection.doc(victimId).update({
      coordinates: new GeoPoint(location.latitude, location.longitude)
    });

  } catch (err) {
    console.log(err);
  }
}

export const updateVictimStatus = async (victimId: string) => {
  try {
    const docRef = doc(db, 'Victims', victimId);

    await updateDoc(docRef, { status: 'done' });

  } catch (err) {
    console.log(err);
  }
}