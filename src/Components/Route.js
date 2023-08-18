import "../styles/Route.css";

import Step from "./Step";

import { v4 as uuid } from 'uuid';

export default function Route(props) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDELERS ----
    // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly
    const handleRouteNameInput = (event) => {
        props.addRouteNameToRoute(event.target.value, props.routeId)
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
    const handleNewStepInput = () => {
        props.addStepListToRoute([...props.stepList, { id: uuid(), length: "", direction: "Foward" }], props.routeId)
    }

    // DESCRIPTION: Removes a route from the routesList
    const handleRemoveRoute = () => {
        props.removeRoute(props.routeId)
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // --- MAPPING ----
    const stepsListJSX = props.stepList.map((stepElement, index) => (
        // The following data is transmitted:
        // 1) stepId -> The id of the current stepElement
        // 2) stepIndex -> The index of the current stepElement in the stepList of a specific route
        // 3) routeId -> The id of the current routeElement
        // 4) routeIndex -> The index of the current routeElement in the routesList
        // 5) addLengthToStep -> Sending a callback to *add data about step's length*
        // 6) addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 7) removeStep -> Sending a callback to *remove the step* from a specific route
        <Step key={stepElement.id}
            stepId={stepElement.id}
            stepIndex={index}
            routeId={props.routeId}
            addLengthToStep={props.addLengthToStep}
            addDirectionToStep={props.addDirectionToStep} 
            removeStep={props.removeStep} />
    ));
    // --------------------------------------------------------

    return (
        <>
            <div className="route">
                <div className="route__bar">
                    <h2 className="route__index">Route #{props.routeIndex + 1}</h2>
                    <div className="route__content">
                        <div className="route__name">
                            <h2>Name: </h2>
                            <input type="text" onChange={handleRouteNameInput}></input>
                        </div>
                        <div className="route__editor-buttons">
                            <button className="route__button--add-step" onClick={handleNewStepInput}>Add Step</button>
                            <button className="route__button--remove-route" onClick={handleRemoveRoute}>Remove Route</button>
                            <button className="route__button--select-mode">Select Mode</button> {/* TODO: Add functionality to this button */}
                            <button className="route__button--select-all-steps">Select All</button> {/* TODO: Add functionality to this button */}
                        </div>
                    </div>
                    <button className="route__button--expand-collapse">Expand/Collapse</button> {/* TODO: Add functionality to this button */}
                </div>
            </div>
            <section className="route__steps-list">
                {stepsListJSX}
            </section>
        </>
    );
}