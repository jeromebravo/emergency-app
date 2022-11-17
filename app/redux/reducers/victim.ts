import { VictimWithoutCoordinates } from '../../interfaces/Victim';
import { ActionTypes, SET_CURRENT_VICTIM } from '../actions/types';

const victim = (
  state: VictimWithoutCoordinates | null = null,
  action: ActionTypes
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_VICTIM:
      return payload as VictimWithoutCoordinates | null;

    default:
      return state;
  }
}

export default victim;