import React from "react";

export function createIllnessContext() {
  return React.createContext(process.env.REACT_APP_ILLNESSES);
}
