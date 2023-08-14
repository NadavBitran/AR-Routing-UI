import RouteComp from "./RouteComp";
import MenuComp from "./MenuComp";
import { useState } from "react";

import "../style/Navigation.css";



export default function Navigation({mode}) {
  
  // --------------------------------------------------------
  // ---- USE STATES ----
  // routesList -> To save the array of routes that the user enters
  const [routesList,setRoutesList] = useState([]);
  // --------------------------------------------------------

  // --------------------------------------------------------
  // --------------------------------------------------------
  // ----- HELPER CALLBACKS ------
  // INPUTS: 
  // 1) updated name route
  // 2) the id of the route
  // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly 
  const addRouteNameToRoute = (routeName , routeid) => {
    setRoutesList(currRouteList => {
       return currRouteList.map((route) => {
        if(route.id === routeid)
          return {...route , routeName : routeName}
        else 
          return route
      })
    })
  }

  // INPUTS:
  // 1) updated stepList
  // 2) the id of the route
  // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
  const addStepListToRoute = (stepList , routeid) => {
    setRoutesList(currRouteList => {
      return currRouteList.map((route) => {
        if(route.id === routeid)
         return {...route , stepList : stepList}
        else
         return route
      })
    })
  }

  // INPUTS:
  // 1) updated length
  // 2) the id of the step
  // 3) the id of the step's route
  // DESCRIPTION: Enters the updated length of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
  const addLengthToStep = (length, stepid, routeid) => {
    setRoutesList(currRouteList => {
      return currRouteList.map(route => {
        if (route.id === routeid) {
          const updatedStepList = route.stepList.map(step => {
            if (step.id === stepid) {
              return { ...step, length : length }; 
            }
            return step;
          });

          return { ...route, stepList: updatedStepList }; 
        }
        return route;
      });
    })
  }

  // INPUTS:
  // 1) updated direction
  // 2) the id of the step
  // 3) the id of the step's route
  // DESCRIPTION: Enters the updated direction of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
  const addDirectionToStep = (direction, stepid, routeid) => {
    setRoutesList(currRouteList => {
      return currRouteList.map(route => {
        if (route.id === routeid) {
          const updatedStepList = route.stepList.map(step => {
            if (step.id === stepid) {
              return { ...step, direction : direction }; 
            }
            return step;
          });

          return { ...route, stepList: updatedStepList }; 
        }
        return route;
      });
    }
    )
  }
  // --------------------------------------------------------
  // --------------------------------------------------------


  // --------------------------------------------------------
  // --------------------------------------------------------
  // ---- MAPPING ----
  const routes = routesList.map((routeElement) => (
    // The following data is transmitted:
    // 1) routeIndex -> the index of the current routeElement
    // 2) addRouteNameToRoute -> Sending a callback to *add data about the route name*
    // 3) addStepListToRoute -> Sending a callback to *add data about the steps*
    // 4) addLengthToStep -> Sending a callback to *add data about step's length*
    // 5) addDirectionToStep -> Sending a callback to *add data about step's direction*
    // 6) stepList -> Sending a read-only ref of the current routeElement stepList to map the Step Components
    <RouteComp key={routeElement.id} 
               routeIndex ={routeElement.id} 
               addRouteNameToRoute={addRouteNameToRoute} 
               addStepListToRoute={addStepListToRoute}
               addLengthToStep = {addLengthToStep}
               addDirectionToStep = {addDirectionToStep}
               stepList={routeElement.stepList}/>
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
