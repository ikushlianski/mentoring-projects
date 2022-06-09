import { minMealsPerDay } from "src/settings/constants";

export const appErrors = {
  invalidMealList: "Invalid meal list",
  invalidSettings: "Invalid app settings",
  noMealList: "Could not find meal list",
  noSetting: "Could not find the requested app setting",
  noSettings: "Could not find app settings",
  tooFewMeals: `You cannot have fewer than ${minMealsPerDay} meals per day`,
};
