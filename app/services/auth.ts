import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../config/firebase';

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  onError?: () => void
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user;

  } catch (err) {
    console.log(err);
    if (onError) onError();
  }
}

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
  onError?: () => void
) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;

  } catch (err) {
    console.log(err);
    if (onError) onError();
  }
}

export const signInWithGoogle = async (idToken: string) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const { user } = await signInWithCredential(auth, credential);
    return user;

  } catch (err) {
    console.log(err);
  }
}

export const signInWithFacebook = async (accessToken: string) => {
  try {
    const credential = FacebookAuthProvider.credential(accessToken);
    const { user } = await signInWithCredential(auth, credential);
    return user;

  } catch (err) {
    console.log(err);
  }
}

export const logout = async () => {
  try {
    await auth.signOut();

  } catch (err) {
    console.log(err);
  }
}