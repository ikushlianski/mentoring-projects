import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoodMorning } from "src/components/goodMorning";
import { Meal } from "src/components/meal";
import { appState } from "src/core/app-state/usedAppBefore";
import { mealListManager } from "src/core/meal-list/mealList";
import { mealStorage } from "src/core/meal-list/mealStorage";
import { Layout } from "src/pages/layout";
import { RoutesEnum } from "src/pages/routes.enum";

export const MealsListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState.usedAppBefore()) {
      navigate(RoutesEnum.welcome);
    }
  }, [navigate]);

  const [wokenUp, setWokenUp] = useState(
    () => mealStorage.getMealList().length > 0
  );

  const [mealList, setMealList] = useState(() => mealListManager.getList());

  const handleWakeUp = () => {
    const mealsForNewDay = mealListManager.generateMealList();

    setMealList(mealsForNewDay);
    setWokenUp(true);
  };

  return (
    <Layout showNavMenu={true}>
      {!wokenUp ? (
        <GoodMorning handleWakeUp={handleWakeUp} />
      ) : (
        <div>
          {mealList.map((meal) => (
            <Meal mealData={meal} key={meal.id} />
          ))}
        </div>
      )}
    </Layout>
  );
};
