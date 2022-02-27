import React from "react";

import { PetStatus } from "../status/PetStatus";
import { FoodIndicator } from "../food/FoodIndicator";
import { AgeIndicator } from "../age/AgeIndicator";
import { useAge } from "../age/useAge";
import { useFoodLevel } from "../food/useFoodLevel";
import { usePetStatus } from "../status/usePetStatus";

export const PetIndicators = () => {
  const { age, getOlder } = useAge();
  const { foodLevel, feed, foodIndicatorStyle } = useFoodLevel(age);

  const petStatus = usePetStatus({ age, foodLevel });

  return (
    <>
      <PetStatus status={petStatus} />
      <FoodIndicator
        getOlderWhenFed={getOlder}
        foodLevel={foodLevel}
        feed={feed}
        foodIndicatorStyle={foodIndicatorStyle}
        age={age}
      />
      <AgeIndicator age={age} />
    </>
  );
};
