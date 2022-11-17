import { LocationObjectCoords } from 'expo-location';

import { ActionTypes, SET_CURRENT_LOCATION } from '../actions/types';

const initialState: LocationObjectCoords = {
  accuracy: 0,
  altitude: 0,
  altitudeAccuracy: 0,
  heading: 0,
  latitude: 0,
  longitude: 0,
  speed: 0
}

const location = (state = initialState, action: ActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_LOCATION:
      return payload as LocationObjectCoords;

    default:
      return state;
  }
}

export default location;