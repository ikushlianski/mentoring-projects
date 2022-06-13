export const minMealsPerDay = 3;

export enum ConfigurableAppSettings {
  TimeFromWakeUpTillBreakfastMinutes = "TimeFromWakeUpTillBreakfastMinutes",
  IntervalBetweenMealsMinutes = "IntervalBetweenMealsMinutes",
  MealsPerDay = "MealsPerDay",
}

export const defaultAppSettings = {
  [ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes]: 20,
  [ConfigurableAppSettings.IntervalBetweenMealsMinutes]: 140,
  [ConfigurableAppSettings.MealsPerDay]: 6,
};

// localStorage-specific keys
export const appSettingsLocalStorageKey = "appSettings";
