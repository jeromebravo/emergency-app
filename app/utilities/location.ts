import { getCurrentPositionAsync } from 'expo-location';

export const locationErrorMessage = 'Please enable location permission in your phone settings and make sure to turn on your device location.'

export const getCurrentLocation = async () => {
  try {
    const location = await getCurrentPositionAsync();

    return location;

  } catch (err) {
    console.log(err);
    return null;
  }
}