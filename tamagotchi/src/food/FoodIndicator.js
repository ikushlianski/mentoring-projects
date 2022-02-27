import React from "react";
import { MAX_AGE } from "../age/constants";

export const FoodIndicator = ({
  getOlderWhenFed,
  foodLevel,
  feed,
  foodIndicatorStyle,
  age,
}) => {
  const handleFeed = () => {
    feed();
    getOlderWhenFed();
  };

  const isAlive = age < MAX_AGE;

  return (
    <div>
      <div>
        <span>Food {foodLevel}%</span>
        {isAlive && (
          <span>
            <div className={"progress"} style={{ ...foodIndicatorStyle }} />
          </span>
        )}
      </div>
      <div>
        <button onClick={handleFeed}>Feed</button>
      </div>
    </div>
  );
};
