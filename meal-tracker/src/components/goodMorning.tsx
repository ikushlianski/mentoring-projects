import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { RoutesEnum } from "src/pages/routes.enum";

interface Props {
  handleWakeUp: () => void;
}

export const GoodMorning: React.FC<Props> = ({ handleWakeUp }) => {
  return (
    <>
      <div>Nice to see you!</div>

      <Link to={RoutesEnum.mealsList}>
        <Button variant={"primary"} onClick={handleWakeUp}>
          Plan meals
        </Button>
      </Link>
    </>
  );
};
