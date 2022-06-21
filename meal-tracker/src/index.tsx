import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealsListPage } from "src/pages/mealsList.page";
import { SettingsPage } from "src/pages/settings.page";
import { WelcomePage } from "src/pages/welcome.page";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="meals-list" element={<MealsListPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
