import React from "react";
import { IMeal } from "src/core/meal/meal";

interface Props {
  mealData: IMeal;
}

export const Meal: React.FC<Props> = ({ mealData }) => {
  return (
    <div>
      <div>{`${mealData.time.getHours()}:${mealData.time.getMinutes()}`}</div>
      <div>Eaten: {mealData.eaten.toString()}</div>
    </div>
  );
};
