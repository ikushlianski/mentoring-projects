import { useState } from "react";

import { DEFAULT_AGE } from "./constants";

export const useAge = () => {
  const [age, setAge] = useState(DEFAULT_AGE);

  const getOlder = () => {
    setAge((prev) => prev + 1);
  };

  return { age, getOlder };
};
