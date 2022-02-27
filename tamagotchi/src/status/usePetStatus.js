import { possibleStatuses } from "./possibleStatuses";
import { MAX_AGE } from "../age/constants";

export const usePetStatus = ({ age, foodLevel }) => {
  if (age === MAX_AGE) {
    return possibleStatuses.dead;
  }

  if (foodLevel < 35) {
    return possibleStatuses.hungry;
  }

  return possibleStatuses.fine;
};
