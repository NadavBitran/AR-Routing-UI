import "../styles/RouteEditor.css";

import Route from "./Route";
import PopupWindow from "./PopupWindow";
import { useState , useEffect , useCallback} from 'react';

export default function RouteEditor({ routesList, setRoutesList }) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE STATES ----
    const [userDecision, setUserDecision] = useState('');
    // isSelectedAll:
    //              If "true"  -> the user wants all the routes to be selected (*even the newly added ones*)
    //              If "false" -> the user wants to un-do the selection of all the routes 
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove selected routes
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // --------------------------------------------------------
    // --------------------------------------------------------

    // ----- EXPAND AND COLLAPSE LOGIC HELPER CALLBACKS -----
  
    // DESCRIPTION: Set the 'IsExpanded' value of the route with the appropriate index to true
    // To determine that the route is in extended mode
    const setIsExpandedTrue = useCallback((routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex && currRoute.stepList.length !== 0)
                    return { ...currRoute, isExpanded: true }
                else
                    return currRoute
            })
        });
    } , [setRoutesList] )

    // DESCRIPTION: Set the 'IsExpanded' value of the route with the appropriate index to false
    // To determine that the route is not in extended mode
    // When routeIndex = -1, Go through all routes, the route with an empty stepList will be UnExpanded
    const setIsExpandedFalse = useCallback((routeIndex = -1) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex || currRoute.stepList.length === 0)
                    return { ...currRoute, isExpanded: false }
                else
                    return currRoute
            })
        });
    } , [setRoutesList] )
    
    
    // --------------------------------------------------------
    // --------------------------------------------------------




    // --------------------------------------------------------
    // --------------------------------------------------------

    // ----- CHECK BOX LOGIC HELPER CALLBACKS ------

    // DESCRIPTION: Enters the updated checked value of the route, and updates the state accordingly
    const updateCheckedRoute = useCallback((checkedValue, routeIndex) => {
        setRoutesList((currRouteList) => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return { ...currRoute, isChecked: (isSelectedAll || checkedValue) }
                else return currRoute
            })
        })
    } , [setRoutesList , isSelectedAll])

    // DESCRIPTION: Enters the updated checked value of all the routes after clicking on "(Un)Select All" button
    const updateCheckAllRoutes = () => {
        const updatedSelectedValue = !isSelectedAll

        setIsSelectedAll(updatedSelectedValue)

        setRoutesList((currRouteList) => {
            return currRouteList.map((currRoute) => { return { ...currRoute, isChecked: updatedSelectedValue } })
        })
    }

    // DESCRIPTION: Enters the updated checked value of the step's route, and updates the state accordingly
    const updateCheckedStep = useCallback((checkedValue, stepIndex, routeIndex) => {
        setRoutesList((currRouteList) => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.map((currStep, currStepIndex) => {
                        if (currStepIndex === stepIndex)
                            return { ...currStep, isChecked: (isSelectedAll || checkedValue) }
                        else return currStep
                    })
                    return { ...currRoute, stepList: updatedStepList }
                }
                else return currRoute
            })
        })
    } , [setRoutesList , isSelectedAll])
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ----- UPDATE DATA HELPER CALLBACKS ------


    // DESCRIPTION: Enters the new name of the route with the appropriate index, and updates the state accordingly
    const addRouteNameToRoute = useCallback((routeName, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return { ...currRoute, routeName: routeName }
                else
                    return currRoute
            })
        });
    } , [setRoutesList])

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate index, and updates the state accordingly
    const addStepListToRoute = useCallback((stepList, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return { ...currRoute, stepList: stepList }
                else
                    return currRoute
            })
        });
        setIsExpandedTrue(routeIndex);
    }

    // DESCRIPTION: Enters the updated length of the step with the appropriate index that inside the route with the appropriate index, and updates the state accordingly
    const addLengthToStep = useCallback((length, stepIndex, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.map((currStep, currStepIndex) => {
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
    } , [setRoutesList] )

    // DESCRIPTION: Enters the updated direction of the step with the appropriate index that inside the route with the appropriate index, and updates the state accordingly
    const addDirectionToStep = useCallback((direction, stepIndex, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.map((currStep, currStepIndex) => {
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
    } , [setRoutesList])
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ----- ADD COMPONENTS HELPER CALLBACKS ------


    // DESCRIPTION: Adds a new route to the routesList
    const handleNewRouteInput = () => {
        setRoutesList((currRouteList) => [...currRouteList, { routeName: "", stepList: [], isChecked: isSelectedAll, isExpanded: false }])
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ----- REMOVE COMPONENTS HELPER CALLBACKS ------

    // DESCRIPTION: Removes a route from the routesList
    const removeRoute = useCallback((routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.filter((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex)
                    return false
                else
                    return true
            })
        });
    } , [setRoutesList])

    const removeSelectedRoutes = useCallback(() => {
            setRoutesList(currRouteList => {
                return currRouteList.filter((currRoute) => !currRoute.isChecked)
            })
    } , [setRoutesList])
    


    // DESCRIPTION: Removes a step from the stepList of the route with the appropriate index
    const removeStep = useCallback((stepIndex, routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.filter((currStep, currStepIndex) => {
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
        setIsExpandedFalse();
    } , [routesList , setRoutesList])


    // DESCRIPTION: Removes the selected steps from the stepList of the route with the appropriate index
    const removeSelectedSteps = useCallback((routeIndex) => {
        setRoutesList(currRouteList => {
            return currRouteList.map((currRoute, currRouteIndex) => {
                if (currRouteIndex === routeIndex) {
                    const updatedStepList = currRoute.stepList.filter(currStep => !currStep.isChecked)
                    return { ...currRoute, stepList: updatedStepList }
                }
                else return currRoute
            })
        })
        setIsExpandedFalse();
    } , [setRoutesList])

    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ----- DEBUGGING HELPER CALLBACKS (temporary section...) ------

    // DESCRIPTION: Prints to the console in a organized way each route in the routesList and each of its step in its stepList
    const printRoutesList = () => {
        if (routesList.length === 0) {
            console.log("The routesList is empty!!!");
            return;
        }
        console.log("---------------------------routeList------------------------");
        routesList.forEach((route, index) => {
            console.log(`Route #${index + 1}: `);
            console.log(`       Route Name: ${route.routeName}`);
            console.log(`       Checked Status: ${route.isChecked}`);
            console.log(`       Checked IsExpanded: ${route.isExpanded}`);
            console.log(`       Step List: `);
            if (route.stepList.length === 0) {
                console.log("           The stepList is empty!!!");
                return;
            }

            route.stepList.forEach((step, index) => {
                console.log(`           Step #${index + 1}: `);
                console.log(`                   Step List Length: ${step.length}`);
                console.log(`                   Step List Direction: ${step.direction}`);
                console.log(`                   Step List Checked Status: ${step.isChecked}`);
            });
        });
        console.log("-------------------------------------------------------------");
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    const createSelectedRoutesPopUpMSG = () => {
        if(warningMessageJSX === null && routesList.some(currRoute => currRoute.isChecked))
        {
            setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected routes
                <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove the selected routes? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
            )
        }
    }

    // DESCRIPTION: handles the user's decision regarding the removal of the selected routes
    useEffect(() => {
        if(userDecision === 'yes')
        {
            removeSelectedRoutes()
        }
        setWarningMessageJSX(null)
        setUserDecision(false)
    }, [userDecision , removeSelectedRoutes])
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // ---- MAPPING ----
    const routesListJSX = routesList.map((routeElement, index) => (
        // The following data is transmitted:
        // 1. routeIndex -> The index of the current routeElement in the routesList
        // 2. addRouteNameToRoute -> Sending a callback to *add data about the route name*
        // 3. addStepListToRoute -> Sending a callback to *add data about the steps*
        // 4. addLengthToStep -> Sending a callback to *add data about step's length*
        // 5. addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 6. removeRoute -> Sending a callback to *remove the route*
        // 7. removeStep -> Sending a callback to *remove the step* from a specific route
        // 8. removeSelectedSteps -> Sending a callback to *remove all selected steps* from a specific route
        // 9. routeElement -> Sending a read-only ref of the current routeElement.
        // 10. updateCheckedRoute -> Sending a callback to *update data about route's checkbox status*
        // 11. updateCheckedStep -> Sending a callback to *update data about step's checkbox status* from specific route
        // 12. setIsExpandedTrue -> Sending a callback to *set the 'isExpanded' value to true*
        // 13. setIsExpandedFalse -> Sending a callback to *set the 'isExpanded' value to false*

        <Route key={index}
            routeIndex={index}
            addRouteNameToRoute={addRouteNameToRoute}
            addStepListToRoute={addStepListToRoute}
            addLengthToStep={addLengthToStep}
            addDirectionToStep={addDirectionToStep}
            removeRoute={removeRoute}
            removeStep={removeStep}
            removeSelectedSteps={removeSelectedSteps}
            routeElement={routeElement}
            updateCheckedRoute={updateCheckedRoute}
            updateCheckedStep={updateCheckedStep}
            setIsExpandedTrue={setIsExpandedTrue}
            setIsExpandedFalse={setIsExpandedFalse}
        />
    ));
    // --------------------------------------------------------

    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <>
            <div className="route-editor">
                <header className="route-editor__buttons">
                    <button className="route-editor__button--add" onClick={handleNewRouteInput}>Add New Route</button>
                    <button className="route-editor__button--select-all" onClick={updateCheckAllRoutes}>{isSelectedAll ? <span>Unselect All</span> : <span>Select All</span>}</button>
                    <button className="route-editor__button--delete" onClick={createSelectedRoutesPopUpMSG}>Remove Selected Routes</button>
                    <button className="route-editor__button--console-log" onClick={printRoutesList}>Print RouteList</button> {/* temporary button... */}
                </header>
                <section className="route-editor__routes-list">
                    {routesListJSX}
                </section>
            </div>
            {warningMessageJSX}
        </>
    );
    // --------------------------------------------------------
}