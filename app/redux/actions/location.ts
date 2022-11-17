import { LocationObjectCoords } from 'expo-location';
import { Dispatch } from '../store';
import { SET_CURRENT_LOCATION } from './types';

export const setCurrentLocation = (location: LocationObjectCoords, dispatch: Dispatch) => {
  dispatch({
    type: SET_CURRENT_LOCATION,
    payload: location
  });
}