import { LocationObjectCoords } from 'expo-location';

import { UserWithoutCoordinates } from '../../interfaces/User';
import { EntityWithoutCoordinates } from '../../interfaces/Entity';
import { ResponderWithoutCoordinates } from '../../interfaces/Responder';
import { VictimWithoutCoordinates } from '../../interfaces/Victim';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_ENTITY = 'SET_CURRENT_ENTITY';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_CURRENT_RESPONDER = 'SET_CURRENT_RESPONDER';
export const SET_CURRENT_VICTIM = 'SET_CURRENT_VICTIM';

export interface ActionTypes {
  type: typeof SET_CURRENT_USER | typeof SET_CURRENT_ENTITY | typeof SET_CURRENT_LOCATION |
    typeof SET_CURRENT_RESPONDER | typeof SET_CURRENT_VICTIM;
  payload: UserWithoutCoordinates | EntityWithoutCoordinates | LocationObjectCoords |
    ResponderWithoutCoordinates | VictimWithoutCoordinates | null;
};