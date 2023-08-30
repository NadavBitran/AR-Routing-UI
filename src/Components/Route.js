import "../styles/Route.css";

import Step from "./Step";
import PopupWindow from "./PopupWindow";


import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect, useCallback } from 'react';

export default function Route({
    routeIndex, addRouteNameToRoute,
    addStepListToRoute, addLengthToStep,
    addDirectionToStep, removeRoute,
    removeStep,
    routeElement, updateCheckedRoute,
    updateCheckedStep, setIsExpandedTrue,
    setIsExpandedFalse
}) {
    // --- USE STATES ----
    const [userDecision, setUserDecision] = useState('');

    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove a route/step
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDELERS ----

    // DESCRIPTION: Enters the updated route checked value with the appropriate index, and updates the state accordingly 
    const handleRouteCheck = (event) => {
        updateCheckedRoute(event.target.checked, routeIndex);
    }

    // DESCRIPTION: Enters the new name of the route with the appropriate index, and updates the state accordingly
    const handleRouteNameInput = (event) => {
        addRouteNameToRoute(event.target.value, routeIndex);
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate index, and updates the state accordingly
    const handleNewStepInput = () => {
        addStepListToRoute([...routeElement.stepList, { 
            length: '', 
            direction: '', 
            isChecked: routeElement.isChecked,
            isLengthInputValid: true, 
            isDirectionInputValid: true, 
            lengthInputErrorMessage: '', 
            directionInputErrorMessage: ''
          
        }], routeIndex)
    }

    // DESCRIPTION: Removes a route from the routesList
    const handleRemoveRoute = useCallback(() => {
        removeRoute(routeIndex);
    }, [routeIndex, removeRoute])


    // DESCRIPTION: Expands\Collapses the route__steps-list section, and updates the state accordingly
    const handleExpandAndCollapse = () => {
        if (routeElement.isExpanded) {
            setIsExpandedFalse(routeIndex);
        }
        else {
            setIsExpandedTrue(routeIndex);
        }
    }

    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    const createRoutePopUpMSG = () => {
        setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the route
            <PopupWindow
                type={"warning"}
                title={"Warning: Confirm Removal"}
                mainContent={"Are you sure you want to remove this route? This action cannot be undone."}
                buttonsKey={['yes', 'cancel']}
                buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                setUserDecision={setUserDecision} />
        );
    }


    // DESCRIPTION: Handles the user's decision regarding the removal of a specific route
    useEffect(() => {
        if (userDecision === 'yes') {
            handleRemoveRoute();
        }
        setWarningMessageJSX(null);
        setUserDecision('');
    }, [userDecision, handleRemoveRoute])

    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // --- MAPPING ----
    const stepsListJSX = routeElement.stepList.map((stepElement, index) => (
        // The following data is transmitted:
        // 1. stepIndex -> The index of the current stepElement in the stepList of a specific route
        // 2. routeIndex -> The index of the current routeElement in the routesList
        // 3. addLengthToStep -> Sending a callback to *add data about step's length*
        // 4. addDirectionToStep -> Sending a callback to *add data about step's direction*
        // 5. removeStep -> Sending a callback to *remove the step* from a specific route
        // 6. stepElement -> Sending a read-only ref of the current stepElement 
        // 7. updateCheckedStep -> Sending a callback to *update the checked step* from a specific route
        <Step key={index}
            stepIndex={index}
            routeIndex={routeIndex}
            addLengthToStep={addLengthToStep}
            addDirectionToStep={addDirectionToStep}
            removeStep={removeStep}
            stepElement={stepElement}
            updateCheckedStep={updateCheckedStep}
        />
    ));
    // --------------------------------------------------------

    return (
        <>
            <div className="route">
                <div className="route__bar">
                    <input type="checkbox" className="route__checkbox" onChange={handleRouteCheck} checked={routeElement.isChecked} />
                    <h2 className="route__index">Route #{routeIndex + 1}</h2>
                    <div className="route__content">
                        <div className="route__name">
                            <section className="route__name-input">
                                <h2>Name: </h2>
                                <input className={(routeElement.isNameInputValid ? '' : 'error')} type="text" onChange={handleRouteNameInput} value={routeElement.routeName} />
                            </section>
                            <p className="route__name-error">{routeElement.nameInputErrorMessage}</p>
                        </div>
                        <div className="route__buttons">
                            <button className="route__button--add-step" onClick={handleNewStepInput}>Add Step</button>
                            <button className="route__button--remove-route" onClick={createRoutePopUpMSG}>Remove Route</button>
                        </div>
                    </div>

                    <IconButton onClick={handleExpandAndCollapse} className="route__button--expand-collapse" disabled={routeElement.stepList.length === 0}>
                        {routeElement.isExpanded ? <ExpandLessIcon className="route__expand-collapse-icon" /> : <ExpandMoreIcon className="route__expand-collapse-icon" />}
                    </IconButton>

                </div>
                <section className={routeElement.isExpanded ? "route__steps-list" : "route__steps-list hidden"}>
                    {stepsListJSX}
                </section>
            </div>
            {warningMessageJSX}
        </>
    );
}