import { MAX_ALLOWED_AGE } from "./constants";

export function checkAgeConfig() {
  const deathAge = Number(process.env.REACT_APP_DEATH_AGE);

  if (isNaN(deathAge)) {
    throw new Error("Age in config should be a number");
  }

  if (deathAge > MAX_ALLOWED_AGE) {
    throw new Error(`Age in config should be up to ${MAX_ALLOWED_AGE} years`);
  }
}
