import Responder, { ResponderWithoutCoordinates } from '../../interfaces/Responder';
import { Dispatch } from '../store';
import { SET_CURRENT_RESPONDER } from './types';

export const setCurrentResponder = (
  responder: Responder | null,
  dispatch: Dispatch
) => {
  const payload: ResponderWithoutCoordinates | null = !responder ? null : {
    createdAt: responder.createdAt,
    id: responder.id,
    incidentId: responder.incidentId,
    responder: responder.responder,
    status: responder.status,
    victimId: responder.victimId
  }

  dispatch({
    type: SET_CURRENT_RESPONDER,
    payload
  });
}