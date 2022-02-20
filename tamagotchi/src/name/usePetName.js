import { useState } from "react";
import { DEFAULT_NAME } from "./constants";
import { usePetNameValidator } from "./validators/usePetNameValidator";

export const usePetName = () => {
  const [savedPetName, savePetName] = useState(DEFAULT_NAME);

  const isNameValid = usePetNameValidator(savedPetName);

  return {
    savePetName,
    savedPetName,
    isNameValid,
  };
};
