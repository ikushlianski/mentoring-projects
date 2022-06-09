import { mealStorage, MealStorage } from "src/meal-list/meal-storage";
import { Meal } from "src/meal/meal";
import { settingsManager, SettingsManager } from "src/settings/settingsManager";

class MealListManager {
  readonly settingsManager: SettingsManager;
  readonly mealStorage: MealStorage;

  constructor(settingsManager: SettingsManager, mealStorage: MealStorage) {
    this.settingsManager = settingsManager;
    this.mealStorage = mealStorage;
  }

  // GET
  getList(): Meal[] {
    return this.mealStorage.getMealList();
  }

  // CREATE
  generateMealList() {
    const mealsCount = this.settingsManager.getSetting("MealsPerDay");

    return Array(mealsCount).fill(new Meal());
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
  mealStorage
);
