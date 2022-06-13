import React from "react";
import { GoodMorning } from "src/components/goodMorning.component";
import { mealListManager } from "src/core/meal-list/mealList";
import { timeManager } from "src/core/time/TimeManager";
import { Layout } from "src/pages/layout";

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
