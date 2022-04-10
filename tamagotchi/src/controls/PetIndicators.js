import React, { useEffect, useState } from "react";

import { PetStatus } from "../status/PetStatus";
import { FoodIndicator } from "../food/FoodIndicator";
import { AgeIndicator } from "../age/AgeIndicator";
import { useAge } from "../age/useAge";
import { useFoodLevel } from "../food/useFoodLevel";
import { usePetStatus } from "../status/usePetStatus";
import { usePetIllness } from "../illness/usePetIllness";
import { DEATH_AGE } from "../age/constants";
import { PetControls } from "./PetControls";
import { DeathModal } from "../death/DeathModal";
import { Modal } from "../common/components/Modal";

export const PetIndicators = () => {
  const [isDead, setIsDead] = useState(false);

  const { age, getOlder } = useAge();
  const { isSick, diedFromIllness, treat, illness } = usePetIllness(isDead);

  const { foodLevel, feed, foodIndicatorStyle, diedFromHunger } = useFoodLevel({
    age,
    isSick,
  });

  useEffect(() => {
    if (diedFromHunger || diedFromIllness || age >= DEATH_AGE) {
      setIsDead(true);
    }
  }, [age, diedFromHunger, diedFromIllness]);

  const petStatus = usePetStatus({
    age,
    foodLevel,
    isSick,
    diedFromIllness,
    diedFromHunger,
  });

  const isAlive = age < DEATH_AGE && !isDead;

  return (
    <>
      <PetStatus status={petStatus} illness={illness} />
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
            illness={illness}
            age={age}
          />
        </Modal>
      )}
    </>
  );
};
