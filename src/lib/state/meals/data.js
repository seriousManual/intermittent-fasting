import uuid from 'uuid';

export const MEAL_ADD = 'MEAL:ADD';
export const MEAL_REMOVE = 'MEAL:REMOVE';

export function createMealAddAction(date) {
  return { type: MEAL_ADD, date };
}

export function createMealRemoveAction(ident) {
  return { type: MEAL_REMOVE, ident };
}

export default function reducer(state = [], action) {
  if (action.type === MEAL_ADD) {
    return state.concat([{
      ident: uuid.v4(),
      date: action.date.toISOString()
    }]);
  }

  if (action.type === MEAL_REMOVE) {
    return state.filter(meal => meal.ident !== action.ident);
  }

  return state;
}