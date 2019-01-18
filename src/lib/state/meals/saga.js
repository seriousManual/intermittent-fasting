import { put, select, takeEvery } from 'redux-saga/effects'
import * as moment from 'moment';
import ms from 'ms';

import { createMealAddAction, createMealRemoveAction } from './data';
import { lastMeal } from '../../selector';

const SAGA_MEAL_ADD = 'SAGA:MEAL:ADD';
const SAGA_MEAL_REMOVE = 'SAGA:MEAL:REMOVE';

export function createSagaAddMealAction(date) {
  return { type: SAGA_MEAL_ADD, date };
}

export function createSagaRemoveMealAction(ident) {
  return { type: SAGA_MEAL_REMOVE, ident };
}

export default function* watchMeal() {
  yield takeEvery(SAGA_MEAL_ADD, sagaAddMeal)
  yield takeEvery(SAGA_MEAL_REMOVE, sagaRemoveMeal);
}

export function* sagaAddMeal({ date }) {
  const myLastMeal = yield select(lastMeal);
  const myDate = date || new Date();

  if (myLastMeal && moment(myDate).diff(moment(myLastMeal.date)) < ms('15m')) {
    console.log('last meal is too close');
    return;
  }

  console.log('adding meal');
  yield put(createMealAddAction(myDate));
}

export function* sagaRemoveMeal({ident}) {
  yield put(createMealRemoveAction(ident));
}