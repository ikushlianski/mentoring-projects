import { minMealsPerDay } from "src/settings/constants";

export const appErrors = {
  invalidSettings: "Invalid app settings",
  noSetting: "Could not find the requested app setting",
  noSettings: "Could not find app settings",
  tooFewMeals: `You cannot have fewer than ${minMealsPerDay} meals per day`,
};
