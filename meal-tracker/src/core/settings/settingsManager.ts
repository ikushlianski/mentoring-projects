import { appErrors } from "src/core/errors/appErrors";
import {
  appSettingsLocalStorageKey,
  ConfigurableAppSettings,
  defaultAppSettings,
} from "src/core/settings/constants";
import { IAppSettings } from "src/core/settings/types";

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

  saveUpdatedSettings(updatedSettings: typeof defaultAppSettings) {
    const rawAppSettings = SettingsManager.retrieveRawAppSettings();
    const parsedAppConfig = SettingsManager.parseSettings(rawAppSettings);

    const newAppConfig = {
      ...parsedAppConfig,
      ...updatedSettings,
    };

    localStorage.setItem(
      appSettingsLocalStorageKey,
      JSON.stringify(newAppConfig)
    );
  }

  saveDefaultSettings() {
    localStorage.setItem(
      appSettingsLocalStorageKey,
      JSON.stringify(defaultAppSettings)
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
