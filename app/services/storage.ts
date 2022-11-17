import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../config/firebase';

export const uploadPhoto = async (photo: string) => {
  try {
    const length = photo.split('/').length;
    const filename = photo.split('/')[length - 1];
    
    const response = await fetch(photo);
    const blob = await response.blob();

    await uploadBytes(ref(storage, filename), blob);
    const photoUrl = await getDownloadURL(ref(storage, filename));

    return photoUrl;

  } catch (err) {
    console.log(err);
  }
}