import { EntityWithoutCoordinates } from '../../interfaces/Entity';
import { SET_CURRENT_ENTITY, ActionTypes } from '../actions/types';

const initialState: EntityWithoutCoordinates = {
  contactNumber: '',
  contactPerson: '',
  createdAt: 0,
  email: '',
  entityAddress: '',
  entityName: '',
  entityType: '',
  id: ''
}

const entity = (state = initialState, action: ActionTypes) => {
  const { type, payload } = action;

  switch(type) {
    case SET_CURRENT_ENTITY:
      return payload as EntityWithoutCoordinates;

    default:
      return state;
  }
}

export default entity;