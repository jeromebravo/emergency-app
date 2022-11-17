import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import entity from './entity';
import location from './location';
import responder from './responder';
import victim from './victim';

const rootReducer = combineReducers({
  user,
  entity,
  location,
  responder,
  victim
});

export default rootReducer;