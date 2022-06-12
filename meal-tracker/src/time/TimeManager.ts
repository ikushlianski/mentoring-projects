import dayjs from "dayjs";
import { Meal } from "src/meal/meal";
import { settingsManager, SettingsManager } from "src/settings/settingsManager";

export class TimeManager {
  constructor(private settingsManager: SettingsManager) {}

  public howManyMealsFitUntilDayEnds(): number {
    const roughHoursTillMidnight = TimeManager.getApproxHoursTillMidnight();

    const minutesBetweenMeals = this.settingsManager.getSetting(
      "IntervalBetweenMealsMinutes"
    );

    return Math.round((roughHoursTillMidnight * 60) / minutesBetweenMeals);
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

  private static getApproxHoursTillMidnight() {
    const endOfDay = dayjs(Date.now()).endOf("day");

    return Math.floor(endOfDay.diff(dayjs(Date.now()), "hours"));
  }
}

export const timeManager = new TimeManager(settingsManager);
