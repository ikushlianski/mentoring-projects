import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { checkIllnesses } from "./illness/checkIllnesses";
import { createIllnessContext } from "./illness/illnessContext";

checkIllnesses();

export const IllnessesContext = createIllnessContext();

ReactDOM.render(
  <React.StrictMode>
    <IllnessesContext.Provider value={process.env.REACT_APP_ILLNESSES}>
      <App />
    </IllnessesContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
