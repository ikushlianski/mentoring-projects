import React from "react";
import { useAge } from "./useAge";

export const AgeIndicator = () => {
  const age = useAge();

  return <div>Age: {age}</div>;
};
