import RouteComp from "./RouteComp";
import MenuComp from "./MenuComp";

import "../style/Navigation.css";



export default function Navigation({ mode, routesList, setRoutesList }) {

  // --------------------------------------------------------
  // --------------------------------------------------------
  // ----- HELPER CALLBACKS ------
  // INPUTS: 
  // 1) updated name route
  // 2) the inedx of the route in the routeList Array
  // DESCRIPTION: Enters the new name of the route with the appropriate index, and updates the state accordingly 
  const addRouteNameToRoute = (routeName, routeIndex) => {
    setRoutesList(currRouteList => {
      return currRouteList.map((currRoute , currRouteIndex) => {
        if (currRouteIndex === routeIndex)
          return { ...currRoute, routeName: routeName }
        else
          return currRoute
      })
    })
  }

  // INPUTS:
  // 1) updated stepList
  // 2) the inedx of the route in the routeList Array
  // DESCRIPTION: Enters the updated steps array of the route with the appropriate index, and updates the state accordingly
  const addStepListToRoute = (stepList, routeIndex) => {
    setRoutesList(currRouteList => {
      return currRouteList.map((currRoute , currRouteIndex) => {
        if (currRouteIndex === routeIndex)
          return { ...currRoute, stepList: stepList }
        else
          return currRoute
      })
    })
  }

  // INPUTS:
  // 1) updated length
  // 2) the index of the step in the route's stepList Array
  // 3) the index of the route in the routeList Array
  // DESCRIPTION: Enters the updated length of the step with the appropriate index that inside the route with the appropriate index, and updates the state accordingly
  const addLengthToStep = (length, stepIndex, routeIndex) => {
    setRoutesList(currRouteList => {
      return currRouteList.map((currRoute , currRouteIndex) => {
        if (currRouteIndex === routeIndex) {
          const updatedStepList = currRoute.stepList.map((currStep , currStepIndex) => {
            if (currStepIndex === stepIndex) {
              return { ...currStep, length: length }
            }
            return currStep
          });

          return { ...currRoute, stepList: updatedStepList }
        }
        return currRoute
      });
    })
  }

  // INPUTS:
  // 1) updated direction
  // 2) the index of the step in the route's stepList Array
  // 3) the index of the route in the routeList Array
  // DESCRIPTION: Enters the updated direction of the step with the appropriate index that inside the route with the appropriate index, and updates the state accordingly
  const addDirectionToStep = (direction, stepIndex, routeIndex) => {
    setRoutesList(currRouteList => {
      return currRouteList.map((currRoute , currRouteIndex) => {
        if (currRouteIndex === routeIndex) {
          const updatedStepList = currRoute.stepList.map((currStep , currStepIndex) => {
            if (currStepIndex === stepIndex) {
              return { ...currStep, direction: direction }
            }
            return currStep
          });

          return { ...currRoute, stepList: updatedStepList }
        }
        return currRoute
      });
    })
  }
  // --------------------------------------------------------
  // --------------------------------------------------------


  // --------------------------------------------------------
  // --------------------------------------------------------
  // ---- MAPPING ----
  const routes = routesList.map((routeElement , routeIndex) => (
    // The following data is transmitted:
    // 1) routeIndex -> the index of the current routeElement
    // 2) addRouteNameToRoute -> Sending a callback to *add data about the route name*
    // 3) addStepListToRoute -> Sending a callback to *add data about the steps*
    // 4) addLengthToStep -> Sending a callback to *add data about step's length*
    // 5) addDirectionToStep -> Sending a callback to *add data about step's direction*
    // 6) stepList -> Sending a read-only ref of the current routeElement stepList to map the Step Components
    <RouteComp key={routeIndex}
      routeIndex={routeIndex}
      addRouteNameToRoute={addRouteNameToRoute}
      addStepListToRoute={addStepListToRoute}
      addLengthToStep={addLengthToStep}
      addDirectionToStep={addDirectionToStep}
      stepList={routeElement.stepList} />
  ));
  // --------------------------------------------------------
  // --------------------------------------------------------



  // --------------------------------------------------------
  // ---- JSX ----
  return (
    <div className="nevComp">
      <div className="routeCompList">{routes}</div>
      <MenuComp setRouteList={setRoutesList}></MenuComp>
    </div>
  );
  // --------------------------------------------------------
}
