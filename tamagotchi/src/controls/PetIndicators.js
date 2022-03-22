import React from "react";

import { PetStatus } from "../status/PetStatus";
import { FoodIndicator } from "../food/FoodIndicator";
import { AgeIndicator } from "../age/AgeIndicator";
import { useAge } from "../age/useAge";
import { useFoodLevel } from "../food/useFoodLevel";
import { usePetStatus } from "../status/usePetStatus";
import { usePetIllness } from "../illness/usePetIllness";
import { MAX_AGE } from "../age/constants";
import { PetControls } from "./PetControls";

export const PetIndicators = () => {
  const { age, getOlder } = useAge();
  const { isSick, isDead: diedFromIllness, treat } = usePetIllness();

  const { foodLevel, feed, foodIndicatorStyle } = useFoodLevel({ age, isSick });
  const petStatus = usePetStatus({ age, foodLevel, isSick, diedFromIllness });

  const isAlive = age < MAX_AGE && !diedFromIllness;

  return (
    <>
      <PetStatus status={petStatus} />
      {isAlive && (
        <FoodIndicator
          foodLevel={foodLevel}
          foodIndicatorStyle={foodIndicatorStyle}
        />
      )}
      <AgeIndicator age={age} />
      <PetControls feed={feed} getOlder={getOlder} treat={treat} />
    </>
  );
};
