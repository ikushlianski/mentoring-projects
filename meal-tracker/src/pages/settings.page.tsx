import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Layout } from "src/pages/layout";
import { RoutesEnum } from "src/pages/routes.enum";
import {
  ConfigurableAppSettings,
  defaultAppSettings,
} from "src/settings/constants";

export const SettingsPage = () => {
  return (
    <Layout showNavMenu={true}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Meals per day (default is 5)</Form.Label>
          <Form.Control
            type="number"
            placeholder="How many meals per day do I need?"
            defaultValue={
              defaultAppSettings[ConfigurableAppSettings.MealsPerDay]
            }
          />

          <Form.Label>
            Interval between meals (default is 140 minutes, or 2h 20min)
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="How much time between meals would I prefer?"
            defaultValue={
              defaultAppSettings[
                ConfigurableAppSettings.IntervalBetweenMealsMinutes
              ]
            }
          />

          <Form.Label>
            Time from waking up to first meal (default is 20 min)
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="How soon do I have breakfast after waking up?"
            defaultValue={
              defaultAppSettings[
                ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes
              ]
            }
          />
        </Form.Group>

        <Link to={RoutesEnum.mealsList}>
          <Button variant={"primary"}>Save & close</Button>
        </Link>
      </Form>
    </Layout>
  );
};
