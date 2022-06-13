import { usedAppBeforeLocalStorageKey } from "src/core/app-state/constants";

export class AppState {
  usedAppBefore(): boolean {
    return Boolean(localStorage.getItem(usedAppBeforeLocalStorageKey));
  }

  setUsedAppBefore(): void {
    localStorage.setItem(usedAppBeforeLocalStorageKey, String(true));
  }
}

export const appState = new AppState();
