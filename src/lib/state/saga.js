import { all } from 'redux-saga/effects'

import mealSaga from './meals/saga'

export default function* rootSaga() {
  yield all([
    mealSaga()
  ]);
}