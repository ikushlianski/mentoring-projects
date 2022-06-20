import dayjs from "dayjs";
import React from "react";
import Button from "react-bootstrap/Button";

import { EatFunction, UIMeal } from "src/components/types";
import classes from "src/components/meal.module.css";

interface Props {
  mealData: UIMeal;
  handleEat: EatFunction;
}

export const Meal: React.FC<Props> = ({ mealData, handleEat }) => {
  const index = Number(mealData.key) + 1;

  return (
    <div className={classes.meal}>
      <span>{index}</span>
      <div>{dayjs(mealData.time).format("HH:mm")}</div>
      {mealData.eaten ? (
        <div>Eaten</div>
      ) : (
        <Button variant="outline-primary" onClick={handleEat(mealData)}>
          Eat
        </Button>
      )}
    </div>
  );
};
