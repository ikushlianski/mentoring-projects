import React from "react";
import { GoodMorning } from "src/meal-list/goodMorning.component";
import { mealListManager } from "src/meal-list/mealList";
import { Layout } from "src/pages/layout";
import { timeManager } from "src/time/TimeManager";

export const MealsListPage = () => {
  const mealList = mealListManager.getList();
  const shouldShowGoodMorning = timeManager.isLongPastLastMeal(mealList);

  return (
    <Layout showNavMenu={true}>
      {shouldShowGoodMorning ? (
        <GoodMorning />
      ) : (
        <div>List of meals will be here</div>
      )}
    </Layout>
  );
};
