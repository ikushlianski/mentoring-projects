import { appErrors } from "src/core/errors/appErrors";
import { mealListLocalStorageKey } from "src/core/meal-list/constants";
import { IRawMeal, Meal } from "src/core/meal/meal";
import { toDomain } from "src/data-mappers/meal.mapper";

export class MealStorage {
  getMealList(): Meal[] {
    try {
      const parsedList = MealStorage.parseMealList().map(toDomain);

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
    const parsedList = this.getMealList();
    const newList = parsedList.filter((meal) => meal.id !== id);

    this.storeMeals(newList);
  }

  removeAll() {
    localStorage.removeItem(mealListLocalStorageKey);
  }

  private static parseMealList() {
    const rawList = localStorage.getItem(mealListLocalStorageKey);

    if (!rawList) {
      return [] as IRawMeal[];
    }

    return JSON.parse(rawList) as IRawMeal[];
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
