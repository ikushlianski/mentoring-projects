import React from "react";

import { Meal } from "src/components/meal";
import { EatFunction, EditFunction } from "src/components/types";
import { IMeal } from "src/core/meal/meal";
import { domainToUiMeal } from "src/data-mappers/meal.mapper";

interface Props {
  list: IMeal[];
  handleEat: EatFunction;
  handleEdit: EditFunction;
}

export const MealList: React.FC<Props> = ({ list, handleEat, handleEdit }) => {
  return (
    <div>
      {list.map((currentMeal, index, arr) => {
        // todo needs to be simplified
        const eatButtonDisabled = Boolean(
          index > 0 && !currentMeal.eaten && !arr[index + 1]?.eaten
        );

        // moving from a domain object of Meal to a UIMeal object, which has UI-related stuff
        const uiMeal = domainToUiMeal(currentMeal, index, eatButtonDisabled);

        return (
          <Meal
            mealData={uiMeal}
            key={currentMeal.id}
            handleEdit={handleEdit}
            handleEat={handleEat}
          />
        );
      })}
    </div>
  );
};
