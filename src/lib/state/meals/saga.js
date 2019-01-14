import { put, select, takeEvery } from 'redux-saga/effects'
import * as moment from 'moment';
import ms from 'ms';

import { createMealAddAction } from './data';
import { lastMeal } from '../../selector';

const SAGA_MEAL_ADD = 'SAGA:MEAL:ADD';

export function createSagaAddMealAction(date) {
  return { type: SAGA_MEAL_ADD, date };
}

export default function* watchAddMeal() {
  yield takeEvery(SAGA_MEAL_ADD, sagaAddMeal)
}

export function* sagaAddMeal({ date }) {
  const myLastMeal = yield select(lastMeal);
  const myDate = date || new Date();

  if (myLastMeal && moment(myDate).diff(moment(myLastMeal.date)) < ms('15m')) {
    return;
  }

  yield put(createMealAddAction(myDate));
}