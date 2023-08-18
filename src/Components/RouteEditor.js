import "../styles/RouteEditor.css";

import Route from "./Route";

import { v4 as uuid } from 'uuid';

export default function RouteEditor({routesList, setRoutesList}) {
    // --------------------------------------------------------
    // ----- HELPER CALLBACKS ------
    // DESCRIPTION: Adds a new route to the routesList
    const handleNewRouteInput = () => {
        setRoutesList((currRouteList) => [...currRouteList, { id: uuid(), routeName: "", stepList: [] }])
    }
    
    // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly
    const addRouteNameToRoute = (routeName, routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((route) => {
                if (route.id === routeId)
                    return { ...route, routeName: routeName }
                else
                    return route
            })
        });
    }

    // DESCRIPTION: Removes a route from the routesList
    const removeRoute = (routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.filter((route) => {
                if (route.id === routeId)
                    return false
                else
                    return true
            })
        });
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
    const addStepListToRoute = (stepList, routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((route) => {
                if (route.id === routeId)
                    return { ...route, stepList: stepList }
                else
                    return route
            })
        });
    }

    // DESCRIPTION: Enters the updated length of the step with the appropriate id that inside the route with the appropriate id, and updates the state accordingly
    const addLengthToStep = (length, stepId, routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeId) {
                    const updatedStepList = route.stepList.map(step => {
                        if (step.id === stepId) {
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
    const addDirectionToStep = (direction, stepId, routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeId) {
                    const updatedStepList = route.stepList.map(step => {
                        if (step.id === stepId) {
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
    const removeStep = (stepId, routeId) => {
        setRoutesList(currRouteList => {
            return currRouteList.map(route => {
                if (route.id === routeId) {
                    const updatedStepList = route.stepList.filter(step => {
                        if (step.id === stepId)
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

    // DESCRIPTION: Prints to the console in a organized way each route in the routesList and each of its step in its stepList
    const printRoutesList = () => {
        if (routesList.length === 0) {
            console.log("The routesList is empty!!!");
            return;
        }
        console.log("---------------------------routeList------------------------");
        routesList.forEach((route, index) => {
            console.log(`Route #${index+1}: `);
            console.log(`       Route Id: ${route.id}`);
            console.log(`       Route Name: ${route.routeName}`);
            console.log(`       Step List: `);
            if (route.stepList.length === 0) {
                console.log("           The stepList is empty!!!");
                return;
            }
            route.stepList.forEach((step, index) => {
                console.log(`           Step #${index+1}: `);
                console.log(`                   Step Id: ${step.id}`);
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
                <button className="route-editor__button--add" onClick={handleNewRouteInput}>Add New Route</button>
                <button className="route-editor__button--select-all">Select All</button> {/* TODO: Add functionality to this button */}
                <button className="route-editor__button--delete">Delete</button> {/* TODO: Add functionality to this button */}
                <button className="route-editor__button--console-log" onClick={printRoutesList}>Print RouteList</button>
            </header>
            <section className="route-editor__routes-list">
                {routesListJSX}
            </section>
        </div>
    );
    // --------------------------------------------------------
}