import React from "react";

import { PetStatus } from "../status/PetStatus";
import { FoodIndicator } from "../food/FoodIndicator";
import { AgeIndicator } from "../age/AgeIndicator";

export const PetIndicators = () => {
  return (
    <>
      <PetStatus />
      <FoodIndicator />
      <AgeIndicator />
    </>
  );
};
