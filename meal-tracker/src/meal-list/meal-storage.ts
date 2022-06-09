import { appErrors } from "src/errors/appErrors";
import { mealListLocalStorageKey } from "src/meal-list/constants";
import { Meal } from "src/meal/meal";

export class MealStorage {
  getMealList(): Meal[] {
    try {
      const parsedList = MealStorage.parseMealList();

      return parsedList.sort((a, b) => {
        return +a.time - +b.time;
      });
    } catch (e) {
      throw new Error(appErrors.invalidMealList);
    }
  }

  storeMeals(list: Meal[]) {
    try {
      const rawMeals = JSON.stringify(list);

      localStorage.setItem(mealListLocalStorageKey, rawMeals);
    } catch (e) {
      throw new Error(appErrors.invalidMealList);
    }
  }

  removeOne(id: string) {
    const parsedList = MealStorage.parseMealList();
    const newList = parsedList.filter((meal) => meal.id === id);

    this.storeMeals(newList);
  }

  removeAll() {
    localStorage.removeItem(mealListLocalStorageKey);
  }

  private static parseMealList() {
    const rawList = localStorage.getItem(mealListLocalStorageKey);

    if (!rawList) {
      throw new Error(appErrors.noMealList);
    }

    return JSON.parse(rawList) as Meal[];
  }
}

export const mealStorage = new MealStorage();
