import React from "react";
import { useFoodLevel } from "./useFoodLevel";

export const FoodIndicator = () => {
  const { foodLevel, foodIndicatorStyle, feed } = useFoodLevel();

  return (
    <div>
      <div>
        <span>Food {foodLevel}%</span>
        <span>
          <div className={"progress"} style={{ ...foodIndicatorStyle }} />
        </span>
      </div>
      <div>
        <button onClick={feed}>Feed</button>
      </div>
    </div>
  );
};
