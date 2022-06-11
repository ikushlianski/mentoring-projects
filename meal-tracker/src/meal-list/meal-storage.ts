import { appErrors } from "src/errors/appErrors";
import { mealListLocalStorageKey } from "src/meal-list/constants";
import { Meal } from "src/meal/meal";

export class MealStorage {
  getMealList(): Meal[] {
    try {
      const parsedList = MealStorage.parseMealList();

      this.sortMealsByTimeDestructively(parsedList);

      return parsedList;
    } catch {
      throw new Error(appErrors.invalidMealList);
    }
  }

  storeMeals(list: Meal[]) {
    this.sortMealsByTimeDestructively(list);

    try {
      const rawMeals = JSON.stringify(list);

      localStorage.setItem(mealListLocalStorageKey, rawMeals);
    } catch {
      throw new Error(appErrors.invalidMealList);
    }
  }

  removeOne(id: string) {
    const parsedList = MealStorage.parseMealList();
    const newList = parsedList.filter((meal) => meal.id !== id);

    this.storeMeals(newList);
  }

  removeAll() {
    localStorage.removeItem(mealListLocalStorageKey);
  }

  private static parseMealList() {
    const rawList = localStorage.getItem(mealListLocalStorageKey);

    if (!rawList) {
      return [] as Meal[];
    }

    return JSON.parse(rawList) as Meal[];
  }

  private sortMealsByTimeDestructively(
    list: Meal[],
    dir: "asc" | "desc" = "asc"
  ) {
    list.sort((a, b) => {
      return dir === "asc" ? +a.time - +b.time : +b.time - +a.time;
    });
  }
}

export const mealStorage = new MealStorage();
