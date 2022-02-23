import { useState } from "react";
import {
  DEFAULT_FOOD_LEVEL,
  FOOD_INDICATOR_WIDTH_PX,
  HOW_OFTEN_FOOD_LEVEL_DECREMENTS_MS,
} from "./constants";
import { useInterval } from "../utils/useInterval";

export const useFoodLevel = () => {
  const [foodLevel, setFoodLevel] = useState(DEFAULT_FOOD_LEVEL);

  const [foodIndicatorStyle, setFoodIndicatorStyle] = useState({
    width: `${FOOD_INDICATOR_WIDTH_PX}px`,
    height: "16px",
    background: "green",
  });

  useInterval(() => {
    setFoodLevel((prevFoodLevel) => prevFoodLevel - 1);

    const newWidth = (foodLevel * FOOD_INDICATOR_WIDTH_PX) / 100;

    setFoodIndicatorStyle((prev) => ({ ...prev, width: newWidth }));
  }, HOW_OFTEN_FOOD_LEVEL_DECREMENTS_MS);

  const feed = () => {
    setFoodLevel(DEFAULT_FOOD_LEVEL);
  };

  return {
    feed,
    foodLevel,
    foodIndicatorStyle,
  };
};
