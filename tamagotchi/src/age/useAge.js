import { useState } from "react";

import { DEFAULT_AGE, HOW_OFTEN_AGE_INCREMENTS_MS } from "./constants";
import { useInterval } from "../utils/useInterval";

export const useAge = () => {
  const [age, setAge] = useState(DEFAULT_AGE);

  useInterval(() => {
    setAge((prev) => prev + 1);
  }, HOW_OFTEN_AGE_INCREMENTS_MS);

  return age;
};
