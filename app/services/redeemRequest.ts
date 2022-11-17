import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where
} from 'firebase/firestore';

import { db } from '../config/firebase';

const Collection = collection(db, 'RedeemRequests');

export const createRedeemRequest = async (
  uid: string,
  gcashName: string,
  gcashNumber: string,
  pointsToConvert: number,
  toReceive: number,
) => {
  try {
    const redeemRequest = {
      createdAt: Date.now(),
      gcashName,
      gcashNumber,
      pointsToConvert,
      requestedBy: uid,
      status: 'pending',
      toReceive
    }

    await addDoc(Collection, redeemRequest);

  } catch (err) {
    console.log(err);
  }
}

export const getRedeemRequests = (
  uid: string,
  cb: (snap: QuerySnapshot<DocumentData>) => void
) => {
  const q = query(
    Collection,
    where('requestedBy', '==', uid),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, cb);
}