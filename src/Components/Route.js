import "../styles/Route.css";

import Step from "./Step";
import PopupWindow from "./PopupWindow";

import {useState, useEffect} from 'react';

export default function Route(props) {
    // --- USE STATES ----
    // isExpanded:
    //           If "true" -> the route__steps-list section is expanded
    //           If "no"   -> the route__steps-list section is collapsed 
    const [isExpanded ,setIsExpanded] = useState(true) 

    // userDecision:
    //              If "Yes, I'm Sure" -> The user confirm that he indeed wants to remove the selected routes/steps
    //              If "No, I'm Not Sure" -> The user doesn't want to remove the selected routes/steps
    const [userDecision, setUserDecision] = useState(null);

    // routeIndexToRemove: The index of the route that the user wants to remove
    const [routeIndexToRemove, setRouteIndexToRemove] = useState(-1);

    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove a route/step
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // removeButton: the remove button that the user clicked on (route/step)
    // Options: "Remove Route", "Remove Selected (Steps)", null (didn't click on any remove button)
    const [removeButton, setRemoveButton] = useState(null);

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
        if (warningMessageJSX === null) { // If the user didn't click on the remove button yet
            setRouteIndexToRemove(props.routeIndex); // Save the index of the route that the user wants to remove so we can remove it later when the user confirms removal
            setRemoveButton("Remove Route"); // Save the remove button that the user clicked on
            setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the route
                <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove this route? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
            );
        } else {
            setWarningMessageJSX(null);
            setUserDecision(null);
            setRemoveButton(null);
            props.removeRoute(routeIndexToRemove);
        }
    }

    // DESCRIPTION: Removes the selected steps from the route with the appropriate index
    const handleRemoveSelectedSteps = () => {
        if (warningMessageJSX === null && props.routeElement.stepList.some((step) => step.isChecked)) { // If the user didn't click on the remove button yet and there is at least one step that is checked
            setRouteIndexToRemove(props.routeIndex); // Save the index of the route that the user wants to remove steps from so we can remove it later when the user confirms removal
            setRemoveButton("Remove Selected (Steps)"); // Save the remove button that the user clicked on
            setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected steps
                <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove the selected steps? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
            );
        } else {
            setWarningMessageJSX(null);
            setUserDecision(null);
            setRemoveButton(null);
            props.removeSelectedSteps(props.routeIndex)
        }
    }
    
    // DESCRIPTION: Expands\Collapses the route__steps-list section, and updates the state accordingly
    const handleExpandAndCollapse = () => {
        setIsExpanded((currIsExpanded) => !currIsExpanded)
        
        const divStepList = document.getElementsByClassName("route__steps-list")[props.routeIndex]
        divStepList.classList.toggle('hidden')
    }
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    // DESCRIPTION: Handles the user's decision regarding the removal of a route or selected steps
    // Why do we use useEffect? Because the setUserDecision that is called in the PopupWindow Componant is asynchronous, 
    // meaning that it doesn't change the value of userDecision immediately after it is called (when the user confirms the removal of the route).
    // If we wouldn't use useEffect, the switch statement might enter when the userDecision is still null, and therefore, result in unexpected behavior.
    // Therefore, we need to use useEffect to wait for the value of userDecision to change, and only then we can enter the appropriate case,
    // without any errors or unexpected behavior. (REMOVE EXPLANATION LATER IF NOT NEEDED)
    useEffect(() => {
        switch (userDecision) {
            case 'yes':
                switch (removeButton) {
                    case 'Remove Route':
                        handleRemoveRoute();
                        break;
                    case 'Remove Selected (Steps)':
                        handleRemoveSelectedSteps();
                        break;
                    default:
                        break;
                }
            case 'cancel':
                setUserDecision(null);
                setWarningMessageJSX(null);
                setRouteIndexToRemove(-1);
                break;
            default:
                break;
        }
    }, [userDecision, routeIndexToRemove, removeButton]);
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // --- MAPPING ----
    const stepsListJSX = props.routeElement.stepList.map((stepElement, index) => (
        // The following data is transmitted:
        // 1) stepIndex -> The index of the current stepElement in the stepList of a specific route
        // 2) routeIndex -> The index of the current routeElement in the routesList
        // 3) addLengthToStep -> Sending a callback to *add data about step's length*
        // 4) addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 5) removeStep -> Sending a callback to *remove the step* from a specific route
        // 6) stepElement -> Sending a read-only ref of the current stepElement. 
        // 7) updateCheckedStep -> Sending a callback to *update data about step's checkbox status* from specific route
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
                            <button className="route__button--remove-selected" onClick={handleRemoveSelectedSteps}>Remove Selected Steps</button> 
                        </div>
                    </div>
                    <button className="route__button--expand-collapse" onClick={handleExpandAndCollapse}>{isExpanded ? <span>Collapse</span> : <span>Expand</span>}</button> 
                </div>
                <section className="route__steps-list">
                    {stepsListJSX}
                </section>
            </div>
            {warningMessageJSX}
        </>
    );
}
