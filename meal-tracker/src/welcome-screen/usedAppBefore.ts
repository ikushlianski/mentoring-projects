import { usedAppBeforeLocalStorageKey } from "src/welcome-screen/constants";

class AppState {
  usedAppBefore(): boolean {
    return Boolean(localStorage.getItem(usedAppBeforeLocalStorageKey));
  }

  setUsedAppBefore(): void {
    localStorage.setItem(usedAppBeforeLocalStorageKey, String(true));
  }
}

export const appState = new AppState();
