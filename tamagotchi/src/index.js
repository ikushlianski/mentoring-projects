import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { checkIllnessesConfig } from "./illness/checkIllnessesConfig";
import { checkAgeConfig } from "./age/checkAgeConfig";

// these could be extracted into their own function like `setupApp`
checkIllnessesConfig();
checkAgeConfig();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
