import { LocationObjectCoords } from 'expo-location';
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  QuerySnapshot,
  updateDoc,
  where
} from 'firebase/firestore';

import { db } from '../config/firebase';
import { GeoFirestore, GeoPoint } from '../config/geofirestore';
import { UserWithoutCoordinates } from '../interfaces/User';

const Collection = collection(db, 'Responders');
const GeoCollection = GeoFirestore.collection('Responders');

export const createResponder = async (
  ids: { incidentId: string | null; victimId: string | null },
  responder: UserWithoutCoordinates,
  location: { latitude: number, longitude: number }
) => {
  try {
    await GeoCollection.add({
      coordinates: new GeoPoint(location.latitude, location.longitude),
      createdAt: Date.now(),
      status: 'acknowledged',
      responder,
      ...ids
    });

  } catch (err) {
    console.log(err);
  }
}

export const findResponder = (
  uid: string,
  cb: (snap: QuerySnapshot<DocumentData>) => void
) => {
  const q = query(
    Collection,
    where('responder.id', '==', uid),
    where('status', '==', 'acknowledged')
  );

  return onSnapshot(q, cb);
}

export const findVictimResponders = (
  victimId: string,
  cb: (snap: QuerySnapshot<DocumentData>) => void
) => {
  const q = query(
    Collection,
    where('victimId', '==', victimId)
  );

  return onSnapshot(q, cb);
}

export const updateResponderLocation = async (
  responderId: string,
  location: LocationObjectCoords
) => {
  try {
    await GeoCollection.doc(responderId).update({
      coordinates: new GeoPoint(location.latitude, location.longitude)
    });

  } catch (err) {
    console.log(err);
  }
}

export const updateResponderStatus = async (
  responderId: string,
  status: 'done' | 'cancelled'
) => {
  try {
    const docRef = doc(db, 'Responders', responderId);

    await updateDoc(docRef, { status });

  } catch (err) {
    console.log(err);
  }
}