import dayjs from "dayjs";
import { mealListLocalStorageKey } from "src/core/meal-list/constants";
import { mealListManager } from "src/core/meal-list/mealList";
import { Meal } from "src/core/meal/meal";
import {
  appSettingsLocalStorageKey,
  defaultAppSettings,
} from "src/core/settings/constants";

describe("MealList", () => {
  describe("generateMealList", () => {
    beforeEach(() => {
      localStorage.setItem(
        appSettingsLocalStorageKey,
        JSON.stringify(defaultAppSettings)
      );
    });

    afterEach(() => {
      localStorage.removeItem(appSettingsLocalStorageKey);
    });

    it("should set first meal time in the generated list to the current time", () => {
      const mockDateNow = dayjs("Jun 14 2022 20:40").toDate();

      jest.useFakeTimers().setSystemTime(mockDateNow);

      const list = mealListManager.generateMealList();
      expect(dayjs(list[0].time).format("HH:mm")).toEqual("21:00");
    });

    it("should generate a list of 2 meals at 20:40 and interval between meals of 2h 20min", () => {
      const mockDateNow = dayjs("Jun 14 2022 20:40").toDate();

      jest.useFakeTimers().setSystemTime(mockDateNow);

      const list = mealListManager.generateMealList();

      expect(list).toHaveLength(2);
    });

    it("should generate a list of 4 meals at 16:34 and interval between meals of 2h 20min", () => {
      const mockDateNow = dayjs("Jun 14 2022 16:34").toDate();

      jest.useFakeTimers().setSystemTime(mockDateNow);

      const list = mealListManager.generateMealList();

      expect(list).toHaveLength(4);
    });
  });

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
      localStorage.removeItem(mealListLocalStorageKey);
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

    it("should generate up to the max number of meals even if time allows more", () => {
      const mockDateNow = new Date("Jun 15 2022 7:00");

      jest.useFakeTimers().setSystemTime(mockDateNow);

      const list = mealListManager.generateMealList();

      expect(list).toHaveLength(6);
      expect(list[5].time).toEqual(new Date("Jun 15 2022 19:00"));
    });
  });
});
