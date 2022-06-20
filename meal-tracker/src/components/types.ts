import React from "react";
import { IMeal } from "src/core/meal/meal";

export interface UIMeal extends IMeal {
  key: number;
}

export type EatFunction = (meal: UIMeal) => (event: React.MouseEvent) => void;
