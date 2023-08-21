import { useCallback } from "react";
import "../styles/Step.css";

import PopupWindow from "./PopupWindow";

import { useState, useEffect } from "react";
import ToolTip from "./ToolTip";

export default function Step({
    stepIndex,routeIndex ,
    addLengthToStep ,addDirectionToStep ,
    removeStep , stepElement, updateCheckedStep
}) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE STATES ----
    
    // userDecision:
    //              If "Yes, I'm Sure" -> The user confirm that he indeed wants to remove the selected routes/steps
    //              If "No, I'm Not Sure" -> The user doesn't want to remove the selected routes/steps
    const [userDecision, setUserDecision] = useState(false);


    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove a route/step
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDLERS ----

    // DESCRIPTION: Enters the updated route checked value with the appropriate index that inside the route with the appropriate index, and updates the state accordingly 
    const handleStepCheck = (event) => {
        updateCheckedStep(event.target.checked , stepIndex , routeIndex)
    }

    // DESCRIPTION: Enters the length of the step in the step's route accordingly
    const handleLengthInput = (event) => {
        addLengthToStep(event.target.value, stepIndex, routeIndex);
    }

    // DESCRIPTION: Enters the direction of the step in the step's route accordingly
    const handleDirectionInput = (event) => {
        addDirectionToStep(event.target.value, stepIndex, routeIndex);
    }

    // DESCRIPTION: Removes the step from the step's route accordingly
    const handleRemoveStep = useCallback(() => {
            removeStep(stepIndex, routeIndex);
        } , [removeStep , stepIndex , routeIndex] )
    
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    const createStepPopUpMSG = () => {
        setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected steps
                <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove this step? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
        )
    }

    // DESCRIPTION: handles the user's decision regarding the removal of the selected routes
    useEffect(() => {
        if(userDecision === 'yes') handleRemoveStep()
        setUserDecision(false);
        setWarningMessageJSX(null);
    }, [userDecision , handleRemoveStep , setUserDecision , setWarningMessageJSX]);

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <>
            <div className="step">
                <input type="checkbox" className="step__checkbox" onChange={handleStepCheck} checked={stepElement.isChecked}/>
                <h3 className="step__index">Step #{stepIndex + 1}</h3>
                <div className="step__content">
                    <div className="step__length">
                        <h3>Length: </h3>
                        <input type="text" onChange={handleLengthInput} placeholder={"Length in meters..."} value={stepElement.length}></input>
                                
                    </div>
                    <div className="step__direction">
                        <h3>Direction: </h3>
                        <select onChange={handleDirectionInput} value={stepElement.direction}>
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
                <button className="step__button--remove" onClick={createStepPopUpMSG}>Remove Step</button>
            </div>
            {warningMessageJSX}
        </>
    );
}