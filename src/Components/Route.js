import "../styles/Route.css";

import Step from "./Step";


export default function Route(props) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDELERS ----

    // DESCRIPTION: Enters the updated route checked value with the appropriate index, and updates the state accordingly 
    const handleRouteCheck = (event) => {
        props.updateCheckedRoute(event.target.checked , props.routeIndex)
    }
    
    // DESCRIPTION: Enters the new name of the route with the appropriate index, and updates the state accordingly
    const handleRouteNameInput = (event) => {
        props.addRouteNameToRoute(event.target.value, props.routeIndex)
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate index, and updates the state accordingly
    const handleNewStepInput = () => {
        props.addStepListToRoute([...props.routeElement.stepList, {length : "", direction : "" , isChecked : false}], props.routeIndex)
    }

    // DESCRIPTION: Removes a route from the routesList
    const handleRemoveRoute = () => {
        props.removeRoute(props.routeIndex)
    }

    // DESCRIPTION: Removes the selected steps from the route with the appropriate index
    const handleRemoveSelectedSteps = () => {
        props.removeSelectedSteps(props.routeIndex)
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // --- MAPPING ----
    const stepsListJSX = props.routeElement.stepList.map((stepElement, index) => (
        // The following data is transmitted:
        // 1) stepId -> The id of the current stepElement
        // 2) stepIndex -> The index of the current stepElement in the stepList of a specific route
        // 3) routeId -> The id of the current routeElement
        // 4) routeIndex -> The index of the current routeElement in the routesList
        // 5) addLengthToStep -> Sending a callback to *add data about step's length*
        // 6) addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 7) removeStep -> Sending a callback to *remove the step* from a specific route
        // 8) updateCheckedStep -> Sending a callback to *update data about step's checkbox status* from specific route
        <Step key={index}
            stepIndex={index}
            routeIndex={props.routeIndex}
            addLengthToStep={props.addLengthToStep}
            addDirectionToStep={props.addDirectionToStep} 
            removeStep={props.removeStep}
            stepElement = {stepElement}
            updateCheckedStep = {props.updateCheckedStep}
            />
    ));
    // --------------------------------------------------------

    return (
        <>
            <div className="route">
                <div className="route__bar">
                    <input type="checkbox" className="route__checkbox" onChange={handleRouteCheck} checked={props.routeElement.isChecked}/>
                    <h2 className="route__index">Route #{props.routeIndex + 1}</h2>
                    <div className="route__content">
                        <div className="route__name">
                            <h2>Name: </h2>
                            <input type="text" onChange={handleRouteNameInput} value={props.routeElement.routeName}/>
                        </div>
                        <div className="route__buttons">
                            <button className="route__button--add-step" onClick={handleNewStepInput}>Add Step</button>
                            <button className="route__button--remove-route" onClick={handleRemoveRoute}>Remove Route</button>
                            <button className="route__button--remove-selected" onClick={handleRemoveSelectedSteps}>Remove Selected</button> 
                        </div>
                    </div>
                    <button className="route__button--expand-collapse">Expand/Collapse</button> {/* TODO: Add functionality to this button */}
                </div>
                <section className="route__steps-list">
                    {stepsListJSX}
                </section>
            </div>
        </>
    );
}