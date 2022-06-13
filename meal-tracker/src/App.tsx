import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { appState } from "src/core/app-state/usedAppBefore";
import { RoutesEnum } from "src/pages/routes.enum";

import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (appState.usedAppBefore()) {
      navigate(RoutesEnum.mealsList);
    } else {
      navigate(RoutesEnum.welcome);
    }
  }, [navigate]);

  return <Spinner animation="grow" />;
}

export default App;
