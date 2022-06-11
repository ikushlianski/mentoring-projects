import { MealStorage } from "src/meal-list/meal-storage";
import { TimeManager } from "src/time/TimeManager";

describe("TimeManager", () => {
  describe("isLongPastLastMeal", () => {
    const mockMeals = [
      // ...earlier meals
      { time: new Date(Date.parse("Jun 11 2022 17:01:10")) },
      { time: new Date(Date.parse("Jun 11 2022 21:43:01")) },
    ];

    const mockMealStorage = {
      getMealList: () => mockMeals,
    } as MealStorage;

    it("should return true if now is more than 4 hours after the last meal", () => {
      const mockNow = new Date(Date.parse("Jun 12 2022 02:55:00"));

      jest.spyOn(Date, "now").mockReturnValueOnce(+mockNow);

      const timeManager = new TimeManager(mockMealStorage);

      expect(timeManager.isLongPastLastMeal()).toBe(true);
    });

    it("should return false if less than 4 hours after passed since the last meal", () => {
      const mockNow = new Date(Date.parse("Jun 11 2022 23:18:39"));

      jest.spyOn(Date, "now").mockReturnValueOnce(+mockNow);

      const timeManager = new TimeManager(mockMealStorage);

      expect(timeManager.isLongPastLastMeal()).toBe(false);
    });
  });
});
