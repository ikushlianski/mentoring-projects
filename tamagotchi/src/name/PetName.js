import React, { useEffect, useState } from "react";
import { DEFAULT_NAME } from "./constants";

export const PetName = ({
  setCanContinue,
  petName,
  savePetName,
  isNameValid,
}) => {
  const [nameTypedIn, setNameTypedIn] = useState(DEFAULT_NAME);

  const handleChange = (event) => {
    setNameTypedIn(event.target.value);
  };

  const handleSave = () => {
    savePetName(nameTypedIn.trim());
  };

  const isNameCorrectlySet = petName && isNameValid;
  const wrongSubmitAttempt = petName && !isNameValid;

  useEffect(() => {
    if (isNameCorrectlySet) {
      setCanContinue(true);
    }
  }, [isNameCorrectlySet, setCanContinue]);

  return isNameCorrectlySet ? (
    <div>Pet name: {petName}</div>
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
