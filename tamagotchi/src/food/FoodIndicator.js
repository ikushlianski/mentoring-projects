import React from "react";

export const FoodIndicator = ({ foodLevel, foodIndicatorStyle }) => {
  return (
    <div>
      <div>
        <span>Food {foodLevel}%</span>
        {
          <span>
            <div className={"progress"} style={{ ...foodIndicatorStyle }} />
          </span>
        }
      </div>
    </div>
  );
};
