import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appState } from "src/core/app-state/usedAppBefore";
import { Layout } from "src/pages/layout";
import Button from "react-bootstrap/Button";
import { RoutesEnum } from "src/pages/routes.enum";

export const WelcomePage = () => {
  const [usedAppBefore] = useState(() => appState.usedAppBefore());

  const navigate = useNavigate();
  const navigateToMealsList = () => navigate(RoutesEnum.mealsList);

  if (usedAppBefore) {
    navigateToMealsList();
  }

  const handleAlreadyConfigured = () => {
    appState.setUsedAppBefore();

    navigateToMealsList();
  };

  return (
    <Layout showNavMenu={false}>
      <div>
        <Link to={RoutesEnum.settings}>
          <Button variant={"primary"}>Configure app</Button>
        </Link>
      </div>

      <div>
        <Link to={RoutesEnum.mealsList}>
          <Button variant={"link"} onClick={handleAlreadyConfigured}>
            I have already configured the app
          </Button>
        </Link>
      </div>
    </Layout>
  );
};
