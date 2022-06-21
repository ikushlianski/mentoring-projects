import dayjs from "dayjs";
import { mealStorage, MealStorage } from "src/core/meal-list/mealStorage";
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

  // CREATE if no list existed
  generateMealList(): Meal[] {
    const mealsCount = this.timeManager.howManyMealsFitUntilDayEnds();

    const intervalBetweenMeals = this.settingsManager.getSetting(
      "IntervalBetweenMealsMinutes"
    );

    const breakfastOffset = this.settingsManager.getSetting(
      "TimeFromWakeUpTillBreakfastMinutes"
    );

    const newMealsForDay = [...new Array(mealsCount)].reduce(
      (acc: Meal[], _: undefined, i) => {
        const meal = new Meal();

        meal.time = dayjs()
          .add(i * intervalBetweenMeals, "minutes")
          .add(breakfastOffset, "minutes")
          .toDate();

        acc.push(meal);

        return acc;
      },
      []
    );

    this.storeMealList(newMealsForDay);

    return newMealsForDay;
  }

  // SAVE
  storeMealList(meals: Meal[]) {
    this.mealStorage.storeMeals(meals);
  }

  // UPDATE
  eatMeal(mealId: string) {
    const meals = this.getList();
    const targetMeal = meals.find((meal) => meal.id === mealId);

    if (targetMeal) {
      targetMeal.markEaten();

      const updatedList = this.updateMealInList(targetMeal);
      const shifted = this.adjustNotEatenMealTimes(updatedList);

      this.mealStorage.storeMeals(shifted);
    }
  }

  updateMealTime(mealId: string, newTime: Date) {
    const meals = this.getList();
    const targetMeal = meals.find((meal) => meal.id === mealId);

    if (targetMeal) {
      targetMeal.updateTime(newTime);

      this.updateMealInList(targetMeal);

      const shifted = this.adjustRemainingMealTimes(targetMeal.id);

      this.storeMealList(shifted);
    }
  }

  // UPDATE
  private updateMealInList(mealToUpdate: Meal): Meal[] {
    const list = this.getList();
    const newList = list.filter((meal) => meal.id !== mealToUpdate.id);

    newList.push(mealToUpdate);

    this.storeMealList(newList);

    return newList;
  }

  // DELETE
  removeSingleMeal(id: string) {
    this.mealStorage.removeOne(id);
  }

  removeOldMealList() {
    this.mealStorage.removeAll();
  }

  private adjustRemainingMealTimes(mealId: string) {
    const meals = this.getList();
    const eatenMealIndex = meals.findIndex((meal) => meal.id === mealId);
    const mealsToAdjust = meals.slice(eatenMealIndex);

    const mealsShifted = mealsToAdjust.reduce((acc: Meal[], cur, i) => {
      const timeOfAdjustedMeal = mealsToAdjust[0].time;
      const intervalBwMeals = this.settingsManager.getSetting(
        "IntervalBetweenMealsMinutes"
      );

      if (i !== 0) {
        const offset = intervalBwMeals * i;

        const newTime = dayjs(timeOfAdjustedMeal)
          .add(offset, "minutes")
          .toDate();

        cur.updateTime(newTime);
      }

      acc.push(cur);

      return acc;
    }, []);

    // meals whose time we did not need to adjust
    const irrelevantMeals = meals.slice(0, eatenMealIndex);

    return [...irrelevantMeals, ...mealsShifted];
  }

  private adjustNotEatenMealTimes(meals: Meal[]) {
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
}

export const mealListManager = new MealListManager(
  settingsManager,
  mealStorage,
  timeManager,
  appState
);
