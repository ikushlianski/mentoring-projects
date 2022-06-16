import { Meal } from "src/core/meal/meal";
import {
  appSettingsLocalStorageKey,
  ConfigurableAppSettings,
} from "src/core/settings/constants";
import { SettingsManager } from "src/core/settings/settingsManager";
import { TimeManager } from "src/core/time/TimeManager";

describe("TimeManager", () => {
  describe("isLongPastLastMeal", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const mockMeals = [
      // ...earlier meals
      { time: new Date(Date.parse("Jun 11 2022 17:01:10")) },
      { time: new Date(Date.parse("Jun 11 2022 21:43:01")) },
    ] as Meal[];

    const settingsManager = new SettingsManager();

    it("should return true if now is more than 4 hours after the last meal", () => {
      const mockNow = new Date(Date.parse("Jun 12 2022 02:55:00"));

      jest.spyOn(Date, "now").mockReturnValue(+mockNow);

      const timeManager = new TimeManager(settingsManager);

      expect(timeManager.isLongPastLastMeal(mockMeals)).toBe(true);
    });

    it("should return false if less than 4 hours after passed since the last meal", () => {
      const mockNow = new Date(Date.parse("Jun 11 2022 23:18:39"));

      jest.spyOn(Date, "now").mockReturnValue(+mockNow);

      const timeManager = new TimeManager(settingsManager);

      expect(timeManager.isLongPastLastMeal(mockMeals)).toBe(false);
    });

    it("should return true if there are no meals stored", () => {
      const mockNow = new Date(Date.parse("Jun 11 2022 23:18:39"));

      jest.spyOn(Date, "now").mockReturnValue(+mockNow);

      const timeManager = new TimeManager(settingsManager);

      expect(timeManager.isLongPastLastMeal([])).toBe(true);
    });
  });

  describe("How many meals fit in time remaining until midnight", () => {
    beforeAll(() => {
      localStorage.setItem(
        appSettingsLocalStorageKey,
        JSON.stringify({
          [ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes]: 20,
          [ConfigurableAppSettings.IntervalBetweenMealsMinutes]: 140,
          [ConfigurableAppSettings.MealsPerDay]: 6,
        })
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      localStorage.removeItem(appSettingsLocalStorageKey);
    });

    const settingsManager = new SettingsManager();

    it("should say there are 2 meals remaining until the end of day", () => {
      const mockNow = new Date("Jun 11 2022 19:55:01");

      jest.useFakeTimers().setSystemTime(mockNow);

      const timeManager = new TimeManager(settingsManager);

      expect(timeManager.howManyMealsFitUntilDayEnds()).toBe(2);
    });

    it("should say there is 1 meal remaining until the end of day", () => {
      const mockNow = new Date("Jun 10 2022 21:48:39");

      jest.useFakeTimers().setSystemTime(mockNow);

      const timeManager = new TimeManager(settingsManager);

      expect(timeManager.howManyMealsFitUntilDayEnds()).toBe(1);
    });
  });
});
