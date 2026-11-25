import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import WeatherMoodWidget from "./weather";

import "./index.css";

 

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <main>

      <h1>My Mood Weather Widget</h1>

      <WeatherMoodWidget weather="Sunny" />

      <WeatherMoodWidget weather="Rainy" />

      <WeatherMoodWidget weather="Cloudy" />

    </main>

  </StrictMode>
);