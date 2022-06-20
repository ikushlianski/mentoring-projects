import { UIMeal } from "src/components/types";
import { IRawMeal, Meal } from "src/core/meal/meal";

export const rawMealToDomain = (rawMeal: IRawMeal) => {
  const meal = new Meal();

  meal.id = rawMeal.id;
  meal.time = new Date(rawMeal.time);
  meal.eaten = rawMeal.eaten;

  return meal;
};

export const UIMealToDomain = (uiMeal: UIMeal) => {
  const meal = new Meal();

  meal.id = uiMeal.id;
  meal.time = uiMeal.time;
  meal.eaten = uiMeal.eaten;

  return meal;
};
