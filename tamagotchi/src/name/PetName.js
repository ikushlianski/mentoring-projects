import React, { useEffect, useState } from "react";
import { DEFAULT_NAME } from "./constants";
import { usePetName } from "./usePetName";

export const PetName = ({ setCanContinue }) => {
  const [nameTypedIn, setNameTypedIn] = useState(DEFAULT_NAME);
  const { savePetName, savedPetName, isNameValid } = usePetName();

  const handleChange = (event) => {
    setNameTypedIn(event.target.value);
  };

  const handleSave = () => {
    savePetName(nameTypedIn.trim());
  };

  const isNameCorrectlySet = savedPetName && isNameValid;
  const wrongSubmitAttempt = savedPetName && !isNameValid;

  useEffect(() => {
    if (isNameCorrectlySet) {
      setCanContinue(true);
    }
  }, [isNameCorrectlySet, setCanContinue]);

  return isNameCorrectlySet ? (
    <div>Pet name: {savedPetName}</div>
  ) : (
    <>
      <input value={nameTypedIn} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
      {wrongSubmitAttempt && (
        <p>
          Invalid name! Please use only Latin characters without special symbols
        </p>
      )}
    </>
  );
};
