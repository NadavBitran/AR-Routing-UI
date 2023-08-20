import "../styles/Step.css";

import PopupWindow from "./PopupWindow";

import { useState, useEffect } from "react";

export default function Step(props) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE STATES ----
    
    // userDecision:
    //              If "Yes, I'm Sure" -> The user confirm that he indeed wants to remove the selected routes/steps
    //              If "No, I'm Not Sure" -> The user doesn't want to remove the selected routes/steps
    const [userDecision, setUserDecision] = useState(null);
    
    // routeIndexToRemove: The index of the route that the user wants to remove
    const [routeIndexToRemove, setRouteIndexToRemove] = useState(-1);
    
    // stepIndexToRemove: The index of the step that the user wants to remove
    const [stepIndexToRemove, setStepIndexToRemove] = useState(-1);

    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove a route/step
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDLERS ----

    // DESCRIPTION: Enters the updated route checked value with the appropriate index that inside the route with the appropriate index, and updates the state accordingly 
    const handleStepCheck = (event) => {
        props.updateCheckedStep(event.target.checked , props.stepIndex , props.routeIndex)
    }

    // DESCRIPTION: Enters the length of the step in the step's route accordingly
    const handleLengthInput = (event) => {
        props.addLengthToStep(event.target.value, props.stepIndex, props.routeIndex);
    }

    // DESCRIPTION: Enters the direction of the step in the step's route accordingly
    const handleDirectionInput = (event) => {
        props.addDirectionToStep(event.target.value, props.stepIndex, props.routeIndex);
    }

    // DESCRIPTION: Removes the step from the step's route accordingly
    const handleRemoveStep = () => {
        if (warningMessageJSX === null) { // if the warning message is not displayed to the user, display it
            setRouteIndexToRemove(props.routeIndex); // save the index of the route which contain the step that the user wants to remove
            setStepIndexToRemove(props.stepIndex); // save the index of the step that the user wants to remove
            setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected steps
                <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove this step? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
            );
        } else {
            props.removeStep(props.stepIndex, props.routeIndex);
            setUserDecision(null);
            setWarningMessageJSX(null);
            setRouteIndexToRemove(-1);
            setStepIndexToRemove(-1);
        }
    }
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    // DESCRIPTION: handles the user's decision regarding the removal of the selected routes
    useEffect(() => {
        switch (userDecision) {
            case 'yes':
                handleRemoveStep();
                break;
            case 'cancel':
                setUserDecision(null);
                setWarningMessageJSX(null);
                setRouteIndexToRemove(-1);
                setStepIndexToRemove(-1);
                break;
            default:
                break;
        }
    }, [userDecision, routeIndexToRemove, stepIndexToRemove]);

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <>
            <div className="step">
                <input type="checkbox" className="step__checkbox" onChange={handleStepCheck} checked={props.stepElement.isChecked}/>
                <h3 className="step__index">Step #{props.stepIndex + 1}</h3>
                <div className="step__content">
                    <div className="step__length">
                        <h3>Length: </h3>
                        <input type="text" onChange={handleLengthInput} placeholder={"Length in meters..."} value={props.stepElement.length}></input>
                    </div>
                    <div className="step__direction">
                        <h3>Direction: </h3>
                        <select onChange={handleDirectionInput} value={props.stepElement.direction}>
                            <option value="none" hidden>Choose Direction</option>
                            <option>Foward</option>
                            <option>Foward-Left</option>
                            <option>Left</option>
                            <option>Left-Backwards</option>
                            <option>Backwards</option>
                            <option>Right-Backwards</option>
                            <option>Right</option>
                            <option>Foward-Right</option>
                        </select>
                    </div>
                </div>
                <button className="step__button--remove" onClick={handleRemoveStep}>Remove Step</button>
            </div>
            {warningMessageJSX}
        </>
    );
}