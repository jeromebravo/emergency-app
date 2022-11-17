import User, { UserWithoutCoordinates } from '../../interfaces/User';
import { Dispatch } from '../store';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user: User, dispatch: Dispatch) => {
  const payload: UserWithoutCoordinates = {
    banned: false,
    cellPhoneNumber: user.cellPhoneNumber,
    createdAt: user.createdAt,
    email: user.email,
    entityId: user.entityId,
    expoPushToken: user.expoPushToken,
    firstName: user.firstName,
    id: user.id,
    identification: user.identification,
    lastName: user.lastName,
    points: user.points,
    professionCategory: user.professionCategory,
    professionName: user.professionName,
    profilePicture: user.profilePicture,
    status: user.status
  }

  dispatch({
    type: SET_CURRENT_USER,
    payload
  });
}

export const clearCurrentUser = (dispatch: Dispatch) => {
  const payload: UserWithoutCoordinates = {
    banned: false,
    cellPhoneNumber: '',
    createdAt: 0,
    email: '',
    entityId: null,
    expoPushToken: '',
    firstName: '',
    id: '',
    identification: null,
    lastName: '',
    points: 0,
    professionCategory: 'Others',
    professionName: '',
    profilePicture: null,
    status: 'standby'
  }

  dispatch({
    type: SET_CURRENT_USER,
    payload
  });
}