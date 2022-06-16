import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Meal } from "src/core/meal/meal";
import {
  settingsManager,
  SettingsManager,
} from "src/core/settings/settingsManager";

dayjs.extend(utc);

export class TimeManager {
  constructor(private settingsManager: SettingsManager) {}

  public howManyMealsFitUntilDayEnds(): number {
    const minutesBetweenMeals = this.settingsManager.getSetting(
      "IntervalBetweenMealsMinutes"
    );
    const maxMealsPerDay = this.settingsManager.getSetting("MealsPerDay");

    let meals = 0;
    let timeNow = dayjs();
    const endOfDay = dayjs().endOf("day");

    while (timeNow.isBefore(endOfDay)) {
      meals++;

      if (meals === maxMealsPerDay) break;

      timeNow = timeNow.add(minutesBetweenMeals, "minutes");
    }

    return meals;
  }

  public isLongPastLastMeal(list: Meal[]) {
    // When we say "long past", this means
    // we're most likely crossing into the next day

    // We mean "4 hrs after last meal"
    const longPastThresholdHours = 4;
    const lastMealTime = list[list.length - 1]?.time;

    return lastMealTime
      ? dayjs(Date.now()).isAfter(
          dayjs(lastMealTime).add(longPastThresholdHours, "hours")
        )
      : true;
  }
}

export const timeManager = new TimeManager(settingsManager);
