export function meals(state) {
  return state.meals;
}

export function lastMeal(state) {
  const currentMeals = meals(state);

  if (!currentMeals.length) {
    return null;
  }

  return currentMeals[currentMeals.length - 1];
}