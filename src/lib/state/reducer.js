import { combineReducers } from 'redux';

import mealReducer from './meals/data';
import appReducer from './app/data';

export default combineReducers({
  app: appReducer,
  meals: mealReducer
});