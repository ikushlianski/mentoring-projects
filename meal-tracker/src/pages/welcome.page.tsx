import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "src/pages/layout";
import Button from "react-bootstrap/Button";
import { RoutesEnum } from "src/pages/routes.enum";

export const WelcomePage = () => {
  return (
    <Layout showNavMenu={false}>
      <div>
        <Link to={RoutesEnum.settings}>
          <Button variant={"primary"}>Configure app</Button>
        </Link>
      </div>

      <div>
        <Link to={RoutesEnum.mealsList}>
          <Button variant={"link"}>I have already configured the app</Button>
        </Link>
      </div>
    </Layout>
  );
};
