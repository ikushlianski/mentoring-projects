import { appErrors } from "src/errors/appErrors";
import {
  appSettingsLocalStorageKey,
  ConfigurableAppSettings,
} from "src/settings/constants";

class SettingsManager {
  getSetting(key: keyof typeof ConfigurableAppSettings) {
    const rawAppSettings = localStorage.getItem(appSettingsLocalStorageKey);

    if (!rawAppSettings) {
      throw new Error(appErrors.noSettings);
    }

    const parsedAppConfig = SettingsManager.parseSettings(rawAppSettings);

    const setting = parsedAppConfig[key];

    if (!setting) {
      throw new Error(appErrors.noSetting);
    }

    return setting;
  }

  private static parseSettings(
    rawSettings: string
  ): typeof ConfigurableAppSettings {
    try {
      return JSON.parse(rawSettings);
    } catch (e) {
      throw new Error(appErrors.invalidSettings);
    }
  }
}

export const settingsManager = new SettingsManager();
