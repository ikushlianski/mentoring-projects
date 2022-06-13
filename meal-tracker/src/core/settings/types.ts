import { ConfigurableAppSettings } from "src/core/settings/constants";

export interface IAppSettings {
  [ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes]: number;
  [ConfigurableAppSettings.IntervalBetweenMealsMinutes]: number;
  [ConfigurableAppSettings.MealsPerDay]: number;
}
