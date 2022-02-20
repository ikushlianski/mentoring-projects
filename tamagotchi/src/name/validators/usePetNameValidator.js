import { petNameRegexp } from "./regexp";
import { useEffect, useState } from "react";

export const usePetNameValidator = (name) => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (petNameRegexp.test(name)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name]);

  return valid;
};
