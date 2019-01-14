import { combineReducers } from 'redux';

import mealReducer from './meals/data';

export default combineReducers({
  meals: mealReducer
});