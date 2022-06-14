import { IRawMeal, Meal } from "src/core/meal/meal";

export const toDomain = (rawMeal: IRawMeal) => {
  const meal = new Meal();
  meal.id = rawMeal.id;
  meal.time = new Date(rawMeal.time);
  meal.eaten = rawMeal.eaten;

  return meal;
};
