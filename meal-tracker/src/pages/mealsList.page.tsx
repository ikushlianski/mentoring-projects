import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoodMorning } from "src/components/goodMorning";
import { MealList } from "src/components/mealList";
import { EatFunction, EditFunction } from "src/components/types";
import { appState } from "src/core/app-state/usedAppBefore";
import { mealListManager } from "src/core/meal-list/mealList";
import { timeManager } from "src/core/time/TimeManager";
import { Layout } from "src/pages/layout";
import { RoutesEnum } from "src/pages/routes.enum";

export const MealsListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState.usedAppBefore()) {
      navigate(RoutesEnum.welcome);
    }
  }, [navigate]);

  const [wokenUp, setWokenUp] = useState(() => {
    const mealList = mealListManager.getList();
    const hasMeals = mealList.length > 0;
    const ateToday = !timeManager.isLongPastLastMeal(mealList);

    return hasMeals && ateToday;
  });

  const [mealList, setMealList] = useState(() => mealListManager.getList());

  const handleWakeUp = () => {
    const mealsForNewDay = mealListManager.generateMealList();

    setMealList(mealsForNewDay);
    setWokenUp(true);
  };

  const handleEat: EatFunction = (meal) => () => {
    // marks meal as eaten and stores the update
    mealListManager.eatMeal(meal.id);

    setMealList(mealListManager.getList());
  };

  const handleEdit: EditFunction = (meal, time) => {
    if (time) {
      mealListManager.updateMealTime(meal.id, time);

      setMealList(mealListManager.getList());
    }
  };

  return (
    <Layout showNavMenu={true}>
      {!wokenUp ? (
        <GoodMorning handleWakeUp={handleWakeUp} />
      ) : (
        <MealList
          handleEat={handleEat}
          handleEdit={handleEdit}
          list={mealList}
        />
      )}
    </Layout>
  );
};
