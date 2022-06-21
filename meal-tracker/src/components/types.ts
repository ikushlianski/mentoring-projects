import React from "react";
import { IMeal } from "src/core/meal/meal";

export interface UIMeal extends IMeal {
  key: number;
  isEatButtonDisabled: boolean;
  isLastMeal: boolean;
}

export type EatFunction = (meal: UIMeal) => (event: React.MouseEvent) => void;

export type EditFunction = (meal: UIMeal, time: Date | null) => void;

export type DeleteFunction = (
  meal: UIMeal
) => (event: React.MouseEvent) => void;
