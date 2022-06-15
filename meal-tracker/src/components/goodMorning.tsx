import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const GoodMorning = () => {
  return (
    <>
      <div>Good morning!</div>

      <Link to={"meals-list"}>
        <Button variant={"primary"}>Wake up</Button>
      </Link>
    </>
  );
};
