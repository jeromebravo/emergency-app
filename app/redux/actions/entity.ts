import Entity, { EntityWithoutCoordinates } from '../../interfaces/Entity';
import { Dispatch } from '../store';
import { SET_CURRENT_ENTITY } from './types';

export const setCurrentEntity = (entity: Entity, dispatch: Dispatch) => {
  const payload: EntityWithoutCoordinates = {
    contactNumber: entity.contactNumber,
    contactPerson: entity.contactPerson,
    createdAt: entity.createdAt,
    email: entity.email,
    entityAddress: entity.entityAddress,
    entityName: entity.entityName,
    entityType: entity.entityType,
    id: entity.id
  }

  dispatch({
    type: SET_CURRENT_ENTITY,
    payload
  });
}

export const clearCurrentEntity = (dispatch: Dispatch) => {
  const payload: EntityWithoutCoordinates = {
    contactNumber: '',
    contactPerson: '',
    createdAt: 0,
    email: '',
    entityAddress: '',
    entityName: '',
    entityType: '',
    id: ''
  }

  dispatch({
    type: SET_CURRENT_ENTITY,
    payload
  });
}