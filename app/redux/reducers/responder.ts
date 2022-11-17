import { ResponderWithoutCoordinates } from '../../interfaces/Responder';
import { ActionTypes, SET_CURRENT_RESPONDER } from '../actions/types';

const responder = (
  state: ResponderWithoutCoordinates | null = null,
  action: ActionTypes
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_RESPONDER:
      return payload as ResponderWithoutCoordinates | null;

    default:
      return state;
  }
}

export default responder;