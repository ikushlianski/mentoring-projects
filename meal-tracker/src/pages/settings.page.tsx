import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { appState } from "src/core/app-state/usedAppBefore";
import {
  ConfigurableAppSettings,
  defaultAppSettings,
} from "src/core/settings/constants";
import { settingsManager } from "src/core/settings/settingsManager";
import { Layout } from "src/pages/layout";
import { RoutesEnum } from "src/pages/routes.enum";

export const SettingsPage = () => {
  const navigate = useNavigate();

  const [mPd, setMPD] = useState<number>(
    () =>
      settingsManager.getSetting("MealsPerDay") ||
      defaultAppSettings[ConfigurableAppSettings.MealsPerDay]
  );

  const [mealsInterval, setMealsInterval] = useState<number>(
    () =>
      settingsManager.getSetting("IntervalBetweenMealsMinutes") ||
      defaultAppSettings[ConfigurableAppSettings.IntervalBetweenMealsMinutes]
  );

  const [timeTillBreakfast, setTimeTillBreakfast] = useState<number>(
    () =>
      settingsManager.getSetting("TimeFromWakeUpTillBreakfastMinutes") ||
      defaultAppSettings[
        ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes
      ]
  );

  const handleSaveSettings = () => {
    appState.setUsedAppBefore();

    settingsManager.saveUpdatedSettings({
      [ConfigurableAppSettings.MealsPerDay]: mPd,
      [ConfigurableAppSettings.IntervalBetweenMealsMinutes]: mealsInterval,
      [ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes]:
        timeTillBreakfast,
    });

    navigate(RoutesEnum.mealsList);
  };

  return (
    <Layout showNavMenu={true}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Meals per day (default is 6)</Form.Label>
          <Form.Control
            type="number"
            placeholder="How many meals per day do I need?"
            value={mPd}
            onChange={(event) => {
              // todo could validate user input in a real app
              setMPD(Number(event.target.value));
            }}
          />

          <Form.Label>
            Interval between meals (default is 140 minutes, or 2h 20min)
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="How much time between meals would I prefer?"
            value={mealsInterval}
            onChange={(event) => {
              setMealsInterval(Number(event.target.value));
            }}
          />

          <Form.Label>
            Time from waking up to first meal (default is 20 min)
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="How soon do I have breakfast after waking up?"
            value={timeTillBreakfast}
            onChange={(event) => {
              setTimeTillBreakfast(Number(event.target.value));
            }}
          />
        </Form.Group>

        <Link to={RoutesEnum.mealsList}>
          <Button variant={"primary"} onClick={handleSaveSettings}>
            Save & close
          </Button>
        </Link>
      </Form>
    </Layout>
  );
};
