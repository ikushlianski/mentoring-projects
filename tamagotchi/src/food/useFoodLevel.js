import { useEffect, useState } from "react";
import {
  DEFAULT_FOOD_LEVEL,
  FOOD_INDICATOR_WIDTH_PX,
  HOW_OFTEN_FOOD_LEVEL_DECREMENTS_MS,
  MIN_FOOD_LEVEL,
} from "./constants";
import { DEATH_AGE } from "../age/constants";
import { greenToRed } from "./hslColor";

export const useFoodLevel = ({ age, isSick }) => {
  const [foodLevel, setFoodLevel] = useState(DEFAULT_FOOD_LEVEL);

  const [foodIndicatorStyle, setFoodIndicatorStyle] = useState({
    width: `${FOOD_INDICATOR_WIDTH_PX}px`,
    height: "16px",
    background: greenToRed(foodLevel),
  });

  const isPetAlive = age < DEATH_AGE;

  const shouldDecrementFoodLevel =
    foodLevel > MIN_FOOD_LEVEL && isPetAlive && !isSick;

  const diedFromHunger = foodLevel === MIN_FOOD_LEVEL;

  useEffect(() => {
    if (shouldDecrementFoodLevel) {
      const interval = setInterval(() => {
        setFoodLevel((prevFoodLevel) => prevFoodLevel - 1);

        const newWidth = (foodLevel * FOOD_INDICATOR_WIDTH_PX) / 100;

        setFoodIndicatorStyle((prev) => ({
          ...prev,
          width: newWidth,
          background: greenToRed(foodLevel),
        }));
      }, HOW_OFTEN_FOOD_LEVEL_DECREMENTS_MS);

      return () => clearInterval(interval);
    }
  }, [foodLevel, shouldDecrementFoodLevel]);

  const feed = () => {
    setFoodLevel(DEFAULT_FOOD_LEVEL);
  };

  return {
    feed,
    foodLevel,
    foodIndicatorStyle,
    diedFromHunger,
  };
};
