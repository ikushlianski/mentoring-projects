import React from "react";

import { Meal } from "src/components/meal";
import { EatFunction } from "src/components/types";
import { IMeal } from "src/core/meal/meal";

interface Props {
  list: IMeal[];
  handleEat: EatFunction;
}

export const MealList: React.FC<Props> = ({ list, handleEat }) => {
  return (
    <div>
      {list.map((meal, index) => {
        const mealData = { ...meal, key: index };

        return <Meal mealData={mealData} key={meal.id} handleEat={handleEat} />;
      })}
    </div>
  );
};
