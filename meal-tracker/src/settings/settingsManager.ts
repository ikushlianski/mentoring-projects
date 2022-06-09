import { appErrors } from "src/errors/appErrors";
import {
  appSettingsLocalStorageKey,
  ConfigurableAppSettings,
} from "src/settings/constants";
import { IAppSettings } from "src/settings/types";

export class SettingsManager {
  getSetting(key: keyof typeof ConfigurableAppSettings) {
    const rawAppSettings = SettingsManager.retrieveRawAppSettings();
    const parsedAppConfig = SettingsManager.parseSettings(rawAppSettings);
    const setting = parsedAppConfig[key];

    if (!setting) {
      throw new Error(appErrors.noSetting);
    }

    return setting;
  }

  setSetting(key: keyof IAppSettings, value: string | number | boolean): void {
    const rawAppSettings = SettingsManager.retrieveRawAppSettings();
    const parsedAppConfig = SettingsManager.parseSettings(rawAppSettings);
    const newAppConfig = {
      ...parsedAppConfig,
      [key]: value,
    };

    localStorage.setItem(
      appSettingsLocalStorageKey,
      JSON.stringify(newAppConfig)
    );
  }

  private static parseSettings(rawSettings: string): IAppSettings {
    try {
      return JSON.parse(rawSettings);
    } catch (e) {
      throw new Error(appErrors.invalidSettings);
    }
  }

  private static retrieveRawAppSettings(): string {
    const rawAppSettings = localStorage.getItem(appSettingsLocalStorageKey);

    if (!rawAppSettings) {
      throw new Error(appErrors.noSettings);
    }

    return rawAppSettings;
  }
}

export const settingsManager = new SettingsManager();
