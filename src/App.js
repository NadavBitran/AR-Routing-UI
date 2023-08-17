import "./App.css";

import PopupWindow from "./Components/PopupWindow";
import RouteManager from "./Components/RouteManager";

import { useState } from "react";

/*

Current Hierarchical Structure of the App:
------------------------------------------

App
└── RouteManager - Contains the Route Editor and Tutorial components (2 separate modes).
    └── RouteEditor - The main component where the user is able to  manages the his routes and steps. Contains a list of routes.
        └── Route - A component which represent a route. Contains a list of steps.
            └── Step - A component which represent a step.
    └── RouteTutorial - A component that explains the user how to use the RouteEditor
PopupWindow - A general component that opens a popup window with a title, main content and buttons.
*/


export default function App() {
  // ---- USE STATES ----
  // userDecision: "yes" -> The user wants to stay in the RouteManager
  //               "no" -> The user wants to move to the next stage in the pipeline
  const [userDecision, setUserDecision] = useState('');

  // ---- COMPONENT STATE ----
  // appContent: The content of the App component
  //             If the userDecision is "yes" -> Open the RouteManager
  //             If the userDecision is "no" -> Move to the next stage in the pipeline
  //             If the userDecision is "default" -> Open (or keep open) the popup window (user hasn't clicked on any button yet)
  let appContent;

  // ---- COMPONENT LOGIC ----
  switch (userDecision) {
    case 'yes':
      appContent = <RouteManager />;
      break;

    case 'no':
      appContent = undefined; // currently undefined - will be changed to the next stage in the pipeline
      break;

    default:
      appContent = (
        <PopupWindow
          title={"Stage X: Managing Your Business Routes"}
          mainContent={"Would you like to start creating your routes?"}
          buttonsKey={['yes', 'no']}
          buttonsContent={['Yes', 'No (continue to the next stage)']}
          setUserDecision={setUserDecision}
        />
      );
  }

  // ---- COMPONENT RENDER ----
  return (
    <div className="app">
      {appContent}
    </div>
  );
}




// =======
// Suggestion 1

// function App() {
//   const [userDecision, setUserDecision] = useState('none');

  // ---- APP COMPONENT ----
  // if "none" -> Open the popup window
  // if "yes" -> Open the RouteManager
  // if "no" -> Move to the next stage in the pipeline
//   return (
//     <div className="appComp">
//       {getPopupWindow(userDecision, setUserDecision)}
//     </div>
//   );
// }



  // // ---- USE STATES ----
  // // 1) startMenuButton -> To save the name of the button pressed from the StartMenuComp
  // const [startMenuButton, setStartMenuButton] = useState("");

  // // ---- APP COMPONENT ----
  // // if "No" -> Move to the next stage in the pipeline
  // // if "Yes - Start Creating" -> Open the navigation in "normal" mode
  // // if "Yes - Start Tutorial" -> Open the navigation in "tutorial" mode
  // // if deafult -> Open the startMenuComp (client hasn't clicked on any button yet)
  // switch (startMenuButton) {

  //   // In the final integration of the entire application we will have to communicate with the files of the next group in the pipeline
  //   case "No":
  //     return( 
  //     <div className="appComp">
  //        Next Step
  //       </div>);
    
  //   // The following data is transmitted:
  //   // 1) mode = "normal" -> for the Navigation component to open in normal mode
  //   case "Yes - Start Creating":
  //     return (
  //       <div className="appComp">
  //         <Navigation mode={"normal"}/>
  //       </div>
  //     );

  //   // The following data is transmitted:
  //   // 1) mode - "tutorial" -> for the Navigation component to open in tutorial mode
  //   case "Yes - Start Tutorial":
  //     return (
  //       <div className="appComp">
  //         <Navigation mode={"tutorial"} />
  //       </div>
  //     );

  //   // the following data is transmitted:
  //   // 1) setStartMenuButton -> send a callback in order to *get the name of the clicked button from the StartMenuComp Component*
  //   default:
  //     return (
  //       <div className="appComp">
  //         <StartMenuComp setStartMenuButton={setStartMenuButton} />
  //       </div>
  //     );
  // }