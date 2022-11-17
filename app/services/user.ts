import { LocationObjectCoords } from 'expo-location';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';

import User, { UserEntryFields } from '../interfaces/User';
import { db } from '../config/firebase';
import { uploadPhoto } from './storage';
import { GeoFirestore, GeoPoint } from '../config/geofirestore';
import { ProfessionCategory } from '../interfaces/Profession';

const Collection = collection(db, 'Users');
const GeoCollection = GeoFirestore.collection('Users');

export const createUser = async (
  uid: string,
  user: UserEntryFields,
  location: { latitude: number, longitude: number }
) => {
  try {
    const profilePicture = !user.profilePicture ? null : await uploadPhoto(user.profilePicture);

    const userData = {
      ...user,
      banned: false,
      coordinates: new GeoPoint(location.latitude, location.longitude),
      createdAt: Date.now(),
      points: 0,
      profilePicture,
      status: 'standby',
    }

    GeoCollection.doc(uid).set(userData);

    return { id: uid, ...userData } as User;

  } catch (err) {
    console.log(err);
  }
}

export const getUser = async (uid: string) => {
  try {
    const user = await getDoc(doc(db, 'Users', uid));

    return { id: user.id, ...user.data() } as User;

  } catch (err) {
    console.log(err);
    return null;
  }
}


export const getNearbyUsers = async (
  professionCategories: ProfessionCategory[],
  location: { latitude: number, longitude: number }
) => {
  try {
    const users = await GeoCollection
      .near({
        center: new GeoPoint(location.latitude, location.longitude),
        radius: 5
      })
      .where('professionCategory', 'in', professionCategories)
      .get();

    return users.docs.map(user => ({ id: user.id, ...user.data() } as User));

  } catch (err) {
    console.log(err);
  }
}

export const getSubAccounts = async (entityId: string) => {
  try {
    const q = query(
      Collection,
      where('entityId', '==', entityId)
    );

    const subAccounts = await getDocs(q);

    return subAccounts.docs.map(subAccount => ({ id: subAccount.id, ...subAccount.data() } as User));

  } catch (err) {
    console.log(err);
    return null;
  }
}

export const updateUserLocation = async (
  uid: string,
  location: LocationObjectCoords
) => {
  try {
    await GeoCollection.doc(uid).update({
      coordinates: new GeoPoint(location.latitude, location.longitude)
    });

  } catch (err) {
    console.log(err);
  }
}

export const updateUserPoints = async (
  uid: string,
  points: number
) => {
  try {
    const docRef = doc(db, 'Users', uid);

    await updateDoc(docRef, { points });

  } catch (err) {
    console.log(err);
  }
}

export const updateUserstatus = async (
  uid: string,
  status: 'need help' | 'responding' | 'standby'
) => {
  try {
    const docRef = doc(db, 'Users', uid);

    await updateDoc(docRef, { status });

  } catch (err) {
    console.log(err);
  }
}