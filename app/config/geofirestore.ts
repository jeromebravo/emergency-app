import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import firebase from 'firebase/compat/app';

import { firebaseConfig } from '../config/firebase';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const GeoPoint = firebase.firestore.GeoPoint;

export { GeoFirestore, GeoPoint }