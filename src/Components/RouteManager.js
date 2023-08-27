import "../styles/RouteManager.css";

import PopupWindow from "./PopupWindow";
import RouteEditor from "./RouteEditor";

import { useState } from "react";

export default function RouteManager() {
    // ---- STATE HOOKS ----
    // userDecision: "yes" -> User wants to **go** to the **RouteTutorial component**
    //               "no" -> User wants to **stay** in the **RouteEditor component**.
    const [userDecision, setUserDecision] = useState(null);

    const [isOnEditorMode, setIsOnEditorMode] = useState(false);

    // routesList -> To save the array of routes that the user enters
    const [routesList, setRoutesList] = useState([]);

    //jsonObjectList -> saves routesList as Json object
    const [jsonObjectList, setJsonObjectList] = useState();

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
    const handleRoutesToJson = () =>{
        const tempList = routesList.map(element =>({
            routeName: element.routeName, stepList: element.stepList //creates a temp list without the isChecked and isExpanded properties from routesList
        }))

        const dataList = tempList.map(routeElement =>({
            ...routeElement,
            stepList: routeElement.stepList.map(stepElement => ({
                length: stepElement.length, direction: stepElement.direction //creates a new list that removes the isChecked property from stepList
            }))
        }))

        setJsonObjectList(JSON.stringify(dataList));
    }

    // ---- COMPONENT LOGIC ----
    if (!isOnEditorMode) { 
        switch (userDecision) {
            case 'yes':
                routeManagerContent = null // will be changed when we implement the RouteTutorial component
                break;
    
            case 'no':
                setIsOnEditorMode(true);
                routeManagerContent = (
                    <RouteEditor 
                    routesList={routesList}
                    setRoutesList={setRoutesList} />
                );
                break;
    
            default:
                routeManagerContent = (
                    <>
                        <RouteEditor 
                            routesList={routesList}
                            setRoutesList={setRoutesList}
                        />;
                        <PopupWindow
                            type={"question"}
                            title={"Stage X: Managing Your Business Routes"}
                            mainContent={"Would you like first to receive a tutorial on how to use the Route Editor?"}
                            buttonsKey={['yes', 'no']}
                            buttonsContent={['Yes (activate tutorial mode)', 'No (just stay in the editor)']}
                            setUserDecision={setUserDecision}
                        />
                    </>
                );
        }
    } else {
        routeManagerContent = (
            <RouteEditor
                routesList={routesList}
                setRoutesList={setRoutesList}
            />
        );
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
                <button>Tutorial</button>
                <button onClick={handleRoutesToJson}>Continue to the next stage</button>
            </footer>
        </div>
        </>
    );
}
