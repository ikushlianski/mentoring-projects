import { mealListLocalStorageKey } from "src/core/meal-list/constants";
import { mealListManager } from "src/core/meal-list/mealList";
import { Meal } from "src/core/meal/meal";
import {
  appSettingsLocalStorageKey,
  defaultAppSettings,
} from "src/core/settings/constants";

describe("MealList", () => {
  describe("eatMeal", () => {
    beforeEach(() => {
      localStorage.setItem(
        mealListLocalStorageKey,
        JSON.stringify([
          { id: "meal1", time: new Date("Jun 14 2022 15:00"), eaten: true },
          { id: "meal2", time: new Date("Jun 14 2022 17:20"), eaten: false },
          { id: "meal3", time: new Date("Jun 14 2022 19:40"), eaten: false },
        ] as Meal[])
      );

      localStorage.setItem(
        appSettingsLocalStorageKey,
        JSON.stringify(defaultAppSettings)
      );
    });

    afterEach(() => {
      localStorage.removeItem("meals");
      localStorage.removeItem(appSettingsLocalStorageKey);

      jest.useRealTimers();
    });

    it("should mark the eaten meal as eaten", () => {
      const mockDateNow = new Date("2022-06-14T17:30:00.000Z");

      jest.useFakeTimers().setSystemTime(mockDateNow);

      mealListManager.eatMeal("meal2");

      const meals = mealListManager.getList();

      expect(meals[1].eaten).toBe(true);
    });

    it("should shift last meal time to 19:50 of June 14, 2022", () => {
      const mockDateNow = new Date("2022-06-14T17:30:00.000Z");

      jest.useFakeTimers().setSystemTime(mockDateNow);

      mealListManager.eatMeal("meal2");

      const meals = mealListManager.getList();

      // expect time Jun 14 2022 19:50
      expect(new Date(meals[2].time.getTime())).toEqual(
        new Date("2022-06-14T19:50:00.000Z")
      );
    });
  });
});
