import React from "react";

import { Meal } from "src/components/meal";
import {
  DeleteFunction,
  EatFunction,
  EditFunction,
} from "src/components/types";
import { IMeal } from "src/core/meal/meal";
import { domainToUiMeal } from "src/data-mappers/meal.mapper";

interface Props {
  list: IMeal[];
  handleEat: EatFunction;
  handleEdit: EditFunction;
  handleDelete: DeleteFunction;
}

export const MealList: React.FC<Props> = ({
  list,
  handleEat,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      {list.map((currentMeal, index, arr) => {
        // todo needs to be simplified
        const isEatButtonDisabled = Boolean(
          index > 0 && !currentMeal.eaten && !arr[index + 1]?.eaten
        );

        const isLastMeal = index === arr.length - 1;

        // moving from a domain object of Meal to a UIMeal object, which has UI-related stuff
        const uiMeal = domainToUiMeal(
          currentMeal,
          index,
          isEatButtonDisabled,
          isLastMeal
        );

        return (
          <Meal
            mealData={uiMeal}
            key={currentMeal.id}
            handleEdit={handleEdit}
            handleEat={handleEat}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};
