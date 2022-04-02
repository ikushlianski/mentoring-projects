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
import { DeathModal } from "../death/DeathModal";
import { Modal } from "../common/Modal";

export const PetIndicators = () => {
  const { age, getOlder } = useAge();
  const { isSick, diedFromIllness, treat } = usePetIllness();

  const { foodLevel, feed, foodIndicatorStyle, diedFromHunger } = useFoodLevel({
    age,
    isSick,
  });

  const petStatus = usePetStatus({
    age,
    foodLevel,
    isSick,
    diedFromIllness,
    diedFromHunger,
  });

  const isDead = diedFromHunger || diedFromIllness || age >= MAX_AGE;
  const isAlive = age < MAX_AGE && !isDead;

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
      <PetControls
        feed={feed}
        getOlder={getOlder}
        treat={treat}
        isSick={isSick}
        isAlive={isAlive}
      />
      {isDead && (
        <Modal>
          <DeathModal
            diedFromHunger={diedFromHunger}
            diedFromIllness={diedFromIllness}
            age={age}
          />
        </Modal>
      )}
    </>
  );
};
