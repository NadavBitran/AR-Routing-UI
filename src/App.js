import "./App.css";
import Navigation from "./Components/Navigation";
import StartMenuComp from "./Components/StartMenuComp";
import { useState } from "react";

function App() {
  // ---- USE STATES ----
  // 1) startMenuButton -> To save the name of the button pressed from the StartMenuComp
  const [startMenuButton, setStartMenuButton] = useState("");
  // 2) routesList -> To save the array of routes that the user enters
  const [routesList, setRoutesList] = useState([]);
  // --------------------------------------------------------

  // ---- APP COMPONENT ----
  // if "No" -> Move to the next stage in the pipeline
  // if "Yes - Start Creating" -> Open the navigation in "normal" mode
  // if "Yes - Start Tutorial" -> Open the navigation in "tutorial" mode
  // if deafult -> Open the startMenuComp (client hasn't clicked on any button yet)
  switch (startMenuButton) {

    // In the final integration of the entire application we will have to communicate with the files of the next group in the pipeline
    case "No":
      return (
        <div className="appComp">
          Next Step
        </div>);

    // The following data is transmitted:
    // 1) mode = "normal" -> for the Navigation component to open in normal mode
    case "Yes - Start Creating":
      return (
        <div className="appComp">
          <Navigation mode={"normal"} routesList={routesList} setRoutesList={setRoutesList} />
          <button onClick={() => console.log(routesList)}>log</button> {/* Added a log button To follow the changes of the routesList */}
        </div>
      );

    // The following data is transmitted:
    // 1) mode - "tutorial" -> for the Navigation component to open in tutorial mode
    case "Yes - Start Tutorial":
      return (
        <div className="appComp">
          <Navigation mode={"tutorial"} routesList={routesList} setRoutesList={setRoutesList} />
        </div>
      );

    // the following data is transmitted:
    // 1) setStartMenuButton -> send a callback in order to *get the name of the clicked button from the StartMenuComp Component*
    default:
      return (
        <div className="appComp">
          <StartMenuComp setStartMenuButton={setStartMenuButton} />
        </div>
      );
  }
}

export default App;

