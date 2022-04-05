import { DEATH_AGE } from "../age/constants";
import { DEATH_REASONS } from "./constants";

export function getDeathReason({ diedFromHunger, diedFromIllness, age }) {
  if (age >= DEATH_AGE) return DEATH_REASONS["age"];

  if (diedFromHunger) return DEATH_REASONS["hunger"];

  if (diedFromIllness) return DEATH_REASONS["illness"];

  throw new Error("Ran out of reasons for death. Something might be wrong");
}
