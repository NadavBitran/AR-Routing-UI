import "../styles/RouteEditor.css";

import Route from "./Route";


export default function RouteEditor({routesList, setRoutesList}) {
    // --------------------------------------------------------
    // ----- HELPER CALLBACKS ------
    // DESCRIPTION: Adds a new route to the routesList
    const handleNewRouteInput = () => {
        setRoutesList((currRouteList) => [...currRouteList, { routeName: "", stepList: [] }])
    }
    
    // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly
    const addRouteNameToRoute = (routeName, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return { ...currRoute, routeName: routeName }
                else
                    return currRoute
            })
        });
    }

    // DESCRIPTION: Removes a route from the routesList
    const removeRoute = (routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.filter((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return false
                else
                    return true
            })
        });
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
    const addStepListToRoute = (stepList, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return { ...currRoute, stepList: stepList }
                else
                    return currRoute
            })
        });
    }

    // DESCRIPTION: Enters the updated length of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
    const addLengthToStep = (length, stepIndex , routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.map((currStep , currStepIndex) => {
                        if (currStepIndex === stepIndex) {
                            return { ...currStep, length: length };
                        }
                        return currStep;
                    });

                    return { ...currRoute, stepList: updatedStepList };
                }
                return currRoute;
            });
        });
    }

    // DESCRIPTION: Enters the updated direction of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
    const addDirectionToStep = (direction, stepIndex, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.map((currStep , currStepIndex) => {
                        if (currStepIndex === stepIndex) {
                            return { ...currStep, direction: direction };
                        }
                        return currStep;
                    });

                    return { ...currRoute, stepList: updatedStepList };
                }
                return currRoute;
            });
        });
    }

    // DESCRIPTION: Removes a step from the stepList of the route with the appropriate id
    const removeStep = (stepIndex, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute , currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.filter((currStep , currStepIndex) => {
                        if (currStepIndex === stepIndex)
                            return false
                        else
                            return true
                    });

                    return { ...currRoute, stepList: updatedStepList };
                }
                return currRoute;
            });
        });
    }

    // DESCRIPTION: Prints to the console in a organized way each route in the routesList and each of its step in its stepList
    const printRoutesList = () => {
        if (routesList.length === 0) {
            console.log("The routesList is empty!!!");
            return;
        }
        console.log("---------------------------routeList------------------------");
        routesList.forEach((route, index) => {
            console.log(`Route #${index+1}: `);
            console.log(`       Route Name: ${route.routeName}`);
            console.log(`       Step List: `);
            if (route.stepList.length === 0) {
                console.log("           The stepList is empty!!!");
                return;
            }
            route.stepList.forEach((step, index) => {
                console.log(`           Step #${index+1}: `);
                console.log(`                   Step List Length: ${step.length}`);
                console.log(`                   Step List Direction: ${step.direction}`);
            });
        });
        console.log("-------------------------------------------------------------")
    }
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
        // 10) routeName -> Sending a read-only ref of the current routeElement routeName to map the Step Components
        <Route key={index}
            routeIndex={index}
            addRouteNameToRoute={addRouteNameToRoute}
            addStepListToRoute={addStepListToRoute}
            addLengthToStep={addLengthToStep}
            addDirectionToStep={addDirectionToStep}
            removeRoute={removeRoute}
            removeStep={removeStep}
            routeElement = {routeElement} />
    ));
    // --------------------------------------------------------

    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <div className="route-editor">
            <header className="route-editor__buttons">
                <button className="route-editor__button--add" onClick={handleNewRouteInput}>Add New Route</button>
                <button className="route-editor__button--select-all">Select All</button> {/* TODO: Add functionality to this button */}
                <button className="route-editor__button--delete">Remove Selected</button> {/* TODO: Add functionality to this button */}
                <button className="route-editor__button--console-log" onClick={printRoutesList}>Print RouteList</button>
            </header>
            <section className="route-editor__routes-list">
                {routesListJSX}
            </section>
        </div>
    );
    // --------------------------------------------------------
}