import dayjs from "dayjs";
import { mealStorage, MealStorage } from "src/core/meal-list/mealStorage";
import { Meal } from "src/core/meal/meal";
import {
  settingsManager,
  SettingsManager,
} from "src/core/settings/settingsManager";
import { timeManager, TimeManager } from "src/core/time/TimeManager";
import { appState, AppState } from "src/core/app-state/usedAppBefore";
import { toDomain } from "src/data-mappers/meal.mapper";

class MealListManager {
  readonly settingsManager: SettingsManager;
  readonly mealStorage: MealStorage;
  readonly timeManager: TimeManager;
  readonly appState: AppState;

  constructor(
    settingsManager: SettingsManager,
    mealStorage: MealStorage,
    timeManager: TimeManager,
    appState: AppState
  ) {
    this.settingsManager = settingsManager;
    this.mealStorage = mealStorage;
    this.timeManager = timeManager;
    this.appState = appState;
  }

  // GET
  getList(): Meal[] {
    const currentMealList = this.mealStorage.getMealList();

    const isNewDay = this.timeManager.isLongPastLastMeal(currentMealList);

    if (isNewDay) {
      return [];
    }

    return currentMealList;
  }

  // CREATE
  generateMealList() {
    const currentMealList = this.getList();
    const noMeals = currentMealList.length === 0;

    const mealsCount = noMeals
      ? this.timeManager.howManyMealsFitUntilDayEnds()
      : this.settingsManager.getSetting("MealsPerDay");

    const newMealsForDay = Array(mealsCount).fill(new Meal());
  }

  // UPDATE
  updateSingleMeal(list: Meal[], mealToUpdate: Meal): Meal[] {
    const newList = list.filter((meal) => meal.id !== mealToUpdate.id);

    newList.push(mealToUpdate);

    return newList;
  }

  eatMeal(mealId: string) {
    const meals = this.getList();
    const targetMeal = meals.find((meal) => meal.id === mealId);

    if (targetMeal) {
      targetMeal.markEaten();
      const updatedList = this.updateSingleMeal(meals, targetMeal);
      const shifted = this.shiftRemainingMealTimes(updatedList);

      this.mealStorage.storeMeals(shifted);
    }
  }

  private shiftRemainingMealTimes(meals: Meal[]) {
    const eatenMeals = meals.filter((meal) => meal.eaten);
    const lastEatenMeal = eatenMeals[eatenMeals.length - 1];

    if (!lastEatenMeal) return meals;

    const notEatenMeals = meals.filter((meal) => !meal.eaten);
    const lastEatenTime = lastEatenMeal.time;

    const notEatenMealsShifted = notEatenMeals.reduce((acc: Meal[], cur, i) => {
      const intervalBwMeals = this.settingsManager.getSetting(
        "IntervalBetweenMealsMinutes"
      );

      const offset = intervalBwMeals * (i + 1);
      const newTime = dayjs(lastEatenTime).add(offset, "minutes").toDate();

      cur.updateTime(newTime);
      acc.push(cur);

      return acc;
    }, []);

    return [...eatenMeals, ...notEatenMealsShifted];
  }

  // SAVE
  storeMealList(meals: Meal[]) {
    this.mealStorage.storeMeals(meals);
  }

  // DELETE
  removeSingleMeal(id: string) {
    this.mealStorage.removeOne(id);
  }

  removeOldMealList() {
    this.mealStorage.removeAll();
  }
}

export const mealListManager = new MealListManager(
  settingsManager,
  mealStorage,
  timeManager,
  appState
);