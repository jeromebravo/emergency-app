import { UserWithoutCoordinates } from '../../interfaces/User';
import { ActionTypes, SET_CURRENT_USER } from '../actions/types';

const initialState: UserWithoutCoordinates = {
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

const user = (state = initialState, action: ActionTypes) => {
  const { type, payload } = action;

  switch(type) {
    case SET_CURRENT_USER:
      return payload as UserWithoutCoordinates;

    default:
      return state;
  }
}

export default user;