import {
  addDoc,
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

const Collection = collection(db, 'Notifications');

export const createNotification = async (
  sentTo: string,
  ids: { incidentId: string | null; victimId: string | null }
) => {
  try {
    const notification = {
      createdAt: Date.now(),
      seen: false,
      sentTo,
      ...ids
    }

    const notifDoc = await addDoc(Collection, notification);

    setTimeout(() => {
      seenNotification(notifDoc.id);
    }, 60000);

  } catch (err) {
    console.log(err);
  }
}

export const getNotifications = (
  uid: string,
  cb: (snap: QuerySnapshot<DocumentData>) => void
) => {
  const q = query(
    Collection,
    where('sentTo', '==', uid),
    where('seen', '==', false)
  );

  return onSnapshot(q, cb);
}

export const seenNotification = async (notifId: string) => {
  try {
    const docRef = doc(db, 'Notifications', notifId);

    await updateDoc(docRef, { seen: true });

  } catch (err) {
    console.log(err);
  }
}