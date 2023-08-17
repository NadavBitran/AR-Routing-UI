import "../styles/RouteEditor.css";

import Route from "./Route";

import { v4 as uuid } from 'uuid';
import { useState } from "react";

export default function RouteEditor() {

    // --------------------------------------------------------
    // ---- USE STATES ----
    // routesList -> To save the array of routes that the user enters
    const [routesList, setRoutesList] = useState([]);
    // --------------------------------------------------------

    console.log(routesList);

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ----- HELPER CALLBACKS ------

    // DESCRIPTION: Adds a new route to the routesList
    const handleNewRouteInput = () => {
        setRoutesList((currRouteList) => [...currRouteList, { id: uuid(), routeName: "", stepList: [] }])
    }
    
    // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly
    const addRouteNameToRoute = (routeName, routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((route) => {
                if (route.id === routeid)
                    return { ...route, routeName: routeName }
                else
                    return route
            })
        });
    }

    // DESCRIPTION: Removes a route from the routesList
    const removeRoute = (routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.filter((route) => {
                if (route.id === routeid)
                    return false
                else
                    return true
            })
        });
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
    const addStepListToRoute = (stepList, routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((route) => {
                if (route.id === routeid)
                    return { ...route, stepList: stepList }
                else
                    return route
            })
        });
    }

    // DESCRIPTION: Enters the updated length of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
    const addLengthToStep = (length, stepid, routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeid) {
                    const updatedStepList = route.stepList.map(step => {
                        if (step.id === stepid) {
                            return { ...step, length: length };
                        }
                        return step;
                    });

                    return { ...route, stepList: updatedStepList };
                }
                return route;
            });
        });
    }

    // DESCRIPTION: Enters the updated direction of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
    const addDirectionToStep = (direction, stepid, routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeid) {
                    const updatedStepList = route.stepList.map(step => {
                        if (step.id === stepid) {
                            return { ...step, direction: direction };
                        }
                        return step;
                    });

                    return { ...route, stepList: updatedStepList };
                }
                return route;
            });
        });
    }

    // DESCRIPTION: Removes a step from the stepList of the route with the appropriate id
    const removeStep = (stepid, routeid) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeid) {
                    const updatedStepList = route.stepList.filter(step => {
                        if (step.id === stepid)
                            return false
                        else
                            return true
                    });

                    return { ...route, stepList: updatedStepList };
                }
                return route;
            });
        });
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- MAPPING ----
    const routesListJSX = routesList.map((routeElement, index) => (
        // The following data is transmitted:
        // 1) routeId -> The id of the current routeElement
        // 2) routeIndex -> The index of the current routeElement in the routesList
        // 3) addRouteNameToRoute -> Sending a callback to *add data about the route name*
        // 4) addStepListToRoute -> Sending a callback to *add data about the steps*
        // 5) addLengthToStep -> Sending a callback to *add data about step's length*
        // 6) addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 7) removeRoute -> Sending a callback to *remove the route*
        // 8) removeStep -> Sending a callback to *remove the step* from a specific route
        // 9) stepList -> Sending a read-only ref of the current routeElement stepList to map the Step Components
        <Route key={routeElement.id}
            routeId={routeElement.id}
            routeIndex={index}
            addRouteNameToRoute={addRouteNameToRoute}
            addStepListToRoute={addStepListToRoute}
            addLengthToStep={addLengthToStep}
            addDirectionToStep={addDirectionToStep}
            removeRoute={removeRoute}
            removeStep={removeStep}
            stepList={routeElement.stepList} />
    ));
    // --------------------------------------------------------
    // --------------------------------------------------------
    
    // ---- JSX ----
    return (
        <div className="route-editor">
            <header className="route-editor__buttons">
                <button id="route-editor__button--add" onClick={() => handleNewRouteInput()}>Add New Route</button>
                <button id="route-editor__button--select-all">Select All</button> {/* TODO: Add functionality to this button */}
                <button id="route-editor__button--delete">Delete</button> {/* TODO: Add functionality to this button */}
            </header>
            <section className="route-editor__routes-list">
                {routesListJSX}
            </section>
        </div>
    );
}