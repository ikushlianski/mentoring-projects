import React from "react";
import { possibleStatuses } from "./possibleStatuses";

export const PetStatus = ({ status, illness }) => {
  const uiStatus = possibleStatuses[status] || "unknown";

  return (
    <div>
      <div>Status: {uiStatus}</div>
      {illness && <span>Ill with {illness}</span>}
    </div>
  );
};
