import { GeoQuerySnapshot } from 'geofirestore-core';
import { doc, getDoc } from 'firebase/firestore';

import Entity, { EntityEntryFields } from '../interfaces/Entity';
import { db } from '../config/firebase';
import { GeoFirestore, GeoPoint } from '../config/geofirestore';

const GeoCollection = GeoFirestore.collection('Entities');

export const createEntity = async (
  entityId: string,
  entity: EntityEntryFields,
  location: { latitude: number, longitude: number }
) => {
  try {
    const entityData = {
      coordinates: new GeoPoint(location.latitude, location.longitude),
      createdAt: Date.now(),
      ...entity
    }

    GeoCollection.doc(entityId).set(entityData);

    return { id: entityId, ...entityData } as Entity;

  } catch (err) {
    console.log(err);
  }
}

export const getEntity = async (entityId: string) => {
  try {
    const entity = await getDoc(doc(db, 'Entities', entityId));

    return { id: entity.id, ...entity.data() } as Entity;

  } catch (err) {
    console.log(err);
    return null;
  }
}

export const findNearbyEntities = async (
  location: { latitude: number, longitude: number },
  cb: (snap: GeoQuerySnapshot) => void
) => {
  GeoCollection
    .near({
      center: new GeoPoint(location.latitude, location.longitude),
      radius: 5
    })
    .onSnapshot(cb);
}