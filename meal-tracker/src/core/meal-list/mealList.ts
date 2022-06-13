import { mealStorage, MealStorage } from "src/core/meal-list/meal-storage";
import { Meal } from "src/core/meal/meal";
import {
  settingsManager,
  SettingsManager,
} from "src/core/settings/settingsManager";
import { timeManager, TimeManager } from "src/core/time/TimeManager";
import { appState, AppState } from "src/core/app-state/usedAppBefore";

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
    const currentMealList = this.mealStorage.getMealList();
    const noMeals = currentMealList.length === 0;

    const mealsCount = noMeals
      ? this.timeManager.howManyMealsFitUntilDayEnds()
      : this.settingsManager.getSetting("MealsPerDay");

    const newMealsForDay = Array(mealsCount).fill(new Meal());

    this.mealStorage.storeMeals(newMealsForDay);
  }

  // UPDATE
  updateSingleMeal(mealToUpdate: Meal) {
    const meals = this.mealStorage.getMealList();
    const newList = meals.filter((meal) => meal.id !== mealToUpdate.id);

    newList.push(mealToUpdate);

    this.mealStorage.storeMeals(newList);
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
