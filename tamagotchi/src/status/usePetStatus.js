import { possibleStatuses } from "./possibleStatuses";
import { MAX_AGE } from "../age/constants";

export const usePetStatus = ({
  age,
  foodLevel,
  isSick,
  diedFromIllness,
  diedFromHunger,
}) => {
  // could be a switch-case statement as well
  if (age === MAX_AGE) {
    return possibleStatuses.dead;
  }

  if (diedFromIllness || diedFromHunger) {
    return possibleStatuses.dead;
  }

  if (isSick) {
    return possibleStatuses.sick;
  }

  if (foodLevel < 35) {
    return possibleStatuses.hungry;
  }

  return possibleStatuses.fine;
};
