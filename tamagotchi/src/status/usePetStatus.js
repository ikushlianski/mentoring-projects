import { possibleStatuses } from "./possibleStatuses";
import { MAX_AGE } from "../age/constants";

export const usePetStatus = ({ age, foodLevel, isSick, diedFromIllness }) => {
  if (age === MAX_AGE) {
    return possibleStatuses.dead;
  }

  if (diedFromIllness) {
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
