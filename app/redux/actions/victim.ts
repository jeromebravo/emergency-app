import Victim, { VictimWithoutCoordinates } from '../../interfaces/Victim';
import { Dispatch } from '../store';
import { SET_CURRENT_VICTIM } from './types';

export const setCurrentVictim = (
  victim: Victim | null,
  dispatch: Dispatch
) => {
  const payload: VictimWithoutCoordinates | null = !victim ? null : {
    createdAt: victim.createdAt,
    id: victim.id,
    victim: victim.victim,
    status: victim.status,
    professionCategories: victim.professionCategories
  }

  dispatch({
    type: SET_CURRENT_VICTIM,
    payload
  });
}