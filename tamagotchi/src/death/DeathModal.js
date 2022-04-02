import React, { useContext } from "react";

import { PetNameContext } from "../App";
import { DEATH_REASONS, DEATH_REASONS_TO_UI_TEXT } from "./constants";
import { getDeathReason } from "./deathReason";

import "./DeathModal.css";

export const DeathModal = ({ diedFromHunger, diedFromIllness, age }) => {
  const deathReason = getDeathReason({ diedFromHunger, diedFromIllness, age });
  const deathReasonUIText = DEATH_REASONS_TO_UI_TEXT[deathReason];

  const diedFromAge = deathReason === DEATH_REASONS["age"];

  const petName = useContext(PetNameContext);

  return (
    <div className={"DeathModal"}>
      {diedFromAge && (
        <div>
          <p>
            Your pet has lived a long great life... Rest in peace, {petName}!
          </p>
        </div>
      )}
      {!diedFromAge && (
        <div>
          <p>
            Your pet died from {deathReasonUIText} aged {age}
          </p>
        </div>
      )}
    </div>
  );
};
