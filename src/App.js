import "./App.css";

import PopupWindow from "./Components/PopupWindow";
import RouteManager from "./Components/RouteManager";
import Map from "./pages/map";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContextProvider } from "./common/contexts/AppContext";

import { useState } from "react";

/*

Current Hierarchical Structure of the App:
------------------------------------------

App
└── RouteManager - Contains the Route Editor and Tutorial components (2 separate modes).
    └── RouteEditor - The main component where the user is able to  manages the his routes and steps.
        └── Route - A component which represent a route.
            └── Step - A component which represent a step.
    └── RouteTutorial - A component that explains the user how to use the RouteEditor
PopupWindow - A general component that opens a popup window with a title, main content and buttons.
*/

/*
App
└──
  Route --> Map
  Route --> RouteManager

*/

export default function App() {
  // ---- USE STATES ----
  // userDecision: "yes" -> The user wants to stay in the RouteManager
  //               "no" -> The user wants to move to the next stage in the pipeline
  const [userDecision, setUserDecision] = useState("");

  // ---- COMPONENT STATE ----
  // appContent: The content of the App component
  //             If the userDecision is "yes" -> Open the RouteManager
  //             If the userDecision is "no" -> Move to the next stage in the pipeline
  //             If the userDecision is "default" -> Open (or keep open) the popup window (user hasn't clicked on any button yet)
  let appContent;

  // ---- COMPONENT LOGIC ----
  switch (userDecision) {
    case "yes":
      appContent = <RouteManager />;
      break;

    case "no":
      appContent = undefined; // currently undefined - will be changed to the next stage in the pipeline
      break;

    default:
      appContent = (
        <PopupWindow
          type={"question"}
          title={"Stage X: Managing Your Business Routes"}
          mainContent={"Would you like to start creating your routes?"}
          buttonsKey={["yes", "no"]}
          buttonsContent={["Yes", "No (continue to the next stage)"]}
          setUserDecision={setUserDecision}
        />
      );
  }

  // ---- JSX ----

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/route-manager" element={<RouteManager />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}
