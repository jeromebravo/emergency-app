import { doc, getDoc } from 'firebase/firestore';

import RedeemSettings from '../interfaces/RedeemSettings';
import { db } from '../config/firebase';

const ID = 'aj4fBwg7hcG7EOmGSMy2';
const DOC = doc(db, 'RedeemSettings', ID);

export const getRedeemSettings = async () => {
  try {
    const redeemSettings = await getDoc(DOC);

    return { id: redeemSettings.id, ...redeemSettings.data() } as RedeemSettings;

  } catch (err) {
    console.log(err);
    return null;
  }
}