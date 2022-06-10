import dayjs from "dayjs";
import { mealStorage, MealStorage } from "src/meal-list/meal-storage";

export class TimeManager {
  constructor(private mealStorage: MealStorage) {}

  public isLongPastLastMeal() {
    // We mean "4 hrs after last meal"
    // When we say "long past", this means
    // we're most likely crossing into the next day
    const longPastThresholdHours = 4;
    const list = this.mealStorage.getMealList();
    const lastMealTime = list[list.length - 1].time;

    return dayjs(Date.now()).isAfter(
      dayjs(lastMealTime).add(longPastThresholdHours, "hours")
    );
  }
}

export const timeManager = new TimeManager(mealStorage);
