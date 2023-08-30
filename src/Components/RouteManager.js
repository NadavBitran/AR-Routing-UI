import "../styles/RouteManager.css";

import PopupWindow from "./PopupWindow";
import RouteEditor from "./RouteEditor";
import RouteTutorial from "./RouteTutorial";

import { useState } from "react";

export default function RouteManager() {
    // ---- STATE HOOKS ----
    // currentMode: 'normal'            -> User is at normal mode (RouteEditor component).
    //              'tutorial'          -> User is at tutorial mode (RouteTutorial component).
    //               null               -> User is in neither of them (popupWindow appears)
    //              'validation error'  -> User is at normal mode, but there are some validation errors (popupWindow appears and errored fields are marked).
    //              'finished'          -> When the user click on the "Continue to the next stage" button, the RouteEditor component is replaced with a pre tag 
    //                                     that contains the Json object of the routesList (popupWindow appears to inform the user that he finished the stage).
    //             'display json'       -> When the user clicks on the "Ok" button in the popupWindow, only pre tag is displayed with the Json object of the 
    //                                     routesList (no popupWindow).
    const [currentMode, setCurrentMode] = useState(null);

    // routesList -> To save the array of routes that the user enters
    const [routesList, setRoutesList] = useState([]);

    //jsonObjectList -> saves routesList as Json object
    const [jsonObjectList, setJsonObjectList] = useState(null);

    // ---- COMPONENT STATE ----
    // routeManagerContent: The content of the RouteManager component.
    //                      If userDecision is "yes" -> RouteTutorial component
    //                      If userDecision is "no" -> RouteEditor component
    //                      If userDecision is "default" -> RouteEditor component behind PopupWindow component
    let routeManagerContent;

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDELERS ----

    // DESCRIPTION: Converts routeList into a Json object
    const handleRoutesToJson = () => {
        if (areThereAnyErrors()) {
            setCurrentMode('validation error');
            return;
        }

        const dataList = routesList.map(routeElement => ({ // creates a new list that keeps only the routeName and stepList properties
            routeName: routeElement.routeName,
            stepList: routeElement.stepList.map(stepElement => ({ // creates a new list that keeps only the length and direction properties
                length: Number(stepElement.length),
                direction: stepElement.direction
            }))
        }));

        console.log('dataList: ', dataList);

        setJsonObjectList(JSON.stringify(dataList, null, 2));
        setCurrentMode('finished');
    }

    // DESCRIPTION: Checks if there are any errors in the routesList and in any of the steps of each route.
    //              If there are any errors (or missing input fields), will do the following:
    //                  1. Will set appropriate routes and steps isValid properties to false (in order to display the error message).
    //                  2. Will set the appropriate error messages to be displayed under the input fields with the error.
    //                  3. Will return true.
    //              If there are no errors, will return false
    const areThereAnyErrors = () => {
        let areThereAnyErrors = false;

        routesList.forEach(routeElement => {
            if (routeElement.routeName === '') {
                routeElement.isNameInputValid = false;
                routeElement.nameInputErrorMessage = 'Route name is required!';
                areThereAnyErrors = true;
            }
            routeElement.stepList.forEach(stepElement => {
                if (stepElement.length === '') {
                    stepElement.isLengthInputValid = false;
                    stepElement.lengthInputErrorMessage = 'Step length is required!';
                    areThereAnyErrors = true;
                } else if (0 >= stepElement.length || stepElement.length > 10_000) {
                    stepElement.isLengthInputValid = false;
                    stepElement.lengthInputErrorMessage = 'Step length must be a positive number between 0 and 10,000 meters!';
                    areThereAnyErrors = true;
                }

                if (stepElement.direction === '') {
                    stepElement.isDirectionInputValid = false;
                    stepElement.directionInputErrorMessage = 'Step direction is required!';
                    areThereAnyErrors = true;
                }
            })
        })
        return areThereAnyErrors;
    }

    // ---- COMPONENT LOGIC ----
    switch (currentMode) {
        case 'normal':
            routeManagerContent = <RouteEditor
                routesList={routesList}
                setRoutesList={setRoutesList} />
            break;
        case 'tutorial':
            routeManagerContent = <RouteTutorial
                setCurrentMode={setCurrentMode} />
            break;
        case 'validation error':
            routeManagerContent = (
                <>
                    <RouteEditor
                        routesList={routesList}
                        setRoutesList={setRoutesList} />

                    <PopupWindow
                        type={"warning"}
                        title={"Error: Unable to Save and Continue"}
                        mainContent={"There are some errors in your input, please fix them before continuing to the next stage!"}
                        buttonsKey={['normal']}
                        buttonsContent={['Ok']}
                        setUserDecision={setCurrentMode} />
                </>
            );
            break;
        case 'finished':
            routeManagerContent = (
                <>
                    <main>
                        <pre>{jsonObjectList}</pre>
                    </main>

                    <PopupWindow
                        type={"info"}
                        title={"Stage X: Managing Your Business Routes"}
                        mainContent={"You have successfully completed the Route Manager stage! You can now continue to the next stage."}
                        buttonsKey={['display json']}
                        buttonsContent={['Ok']}
                        setUserDecision={setCurrentMode} />
                </>
            );
            break;
        case 'display json':
            routeManagerContent = (
                <main>
                    <pre>{jsonObjectList}</pre>
                </main>
            );
            break;
        default:
            routeManagerContent = (
                <>
                    <RouteEditor
                        routesList={[]}
                        setRoutesList={null} />

                    <PopupWindow
                        type={"question"}
                        title={"Stage X: Managing Your Business Routes"}
                        mainContent={"Would you like first to receive a tutorial on how to use the Route Editor?"}
                        buttonsKey={['tutorial', 'normal']}
                        buttonsContent={['Yes (activate tutorial mode)', 'No (just stay in the editor)']}
                        setUserDecision={setCurrentMode} />
                </>
            );
            break;
    }

    // ---- COMPONENT RENDER ----
    return (
        <>
            <div className="route-manager">
                <header className="route-manager__header">
                    <h1>Route Manager</h1>
                </header>
                {routeManagerContent}
                <footer className="route-manager__footer">
                    <button className="route-manager__button--tutorial" onClick={() => setCurrentMode('tutorial')}>Tutorial</button>
                    <button className="route-manager__button--continue" onClick={handleRoutesToJson}>Continue to the next stage</button>
                </footer>
            </div>
        </>
    );
}
