import React from "react";
import { possibleStatuses } from "./possibleStatuses";

export const PetStatus = ({ status }) => {
  const uiStatus = possibleStatuses[status] || "unknown";

  return <div>Status: {uiStatus}</div>;
};
