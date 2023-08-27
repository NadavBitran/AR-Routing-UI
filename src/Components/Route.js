import "../styles/Route.css";

import Step from "./Step";
import PopupWindow from "./PopupWindow";


import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState , useEffect , useCallback } from 'react';

export default function Route({
    routeIndex , addRouteNameToRoute , 
    addStepListToRoute , addLengthToStep ,
    addDirectionToStep , removeRoute ,
    removeStep , removeSelectedSteps ,
    routeElement ,updateCheckedRoute ,
    updateCheckedStep ,isExpanded ,
    expandAndCollapse
}) {
    // --- USE STATES ----
    const [userDecision, setUserDecision] = useState('');


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
        updateCheckedRoute(event.target.checked, routeIndex)
    }

    // DESCRIPTION: Enters the new name of the route with the appropriate index, and updates the state accordingly
    const handleRouteNameInput = (event) => {
        addRouteNameToRoute(event.target.value, routeIndex)
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate index, and updates the state accordingly
    const handleNewStepInput = () => {
        addStepListToRoute([...routeElement.stepList, { length: "", direction: "", isChecked: false }], routeIndex)
    }

    // DESCRIPTION: Removes a route from the routesList
    const handleRemoveRoute = useCallback(() => {
            removeRoute(routeIndex);
    } , [routeIndex , removeRoute])
    

    // DESCRIPTION: Removes the selected steps from the route with the appropriate index
    const handleRemoveSelectedSteps = useCallback(() => {
            removeSelectedSteps(routeIndex)
    } , [routeIndex , removeSelectedSteps] )
    

    // DESCRIPTION: Expands\Collapses the route__steps-list section, and updates the state accordingly
    const handleExpandAndCollapse = () => {
        expandAndCollapse(routeElement, routeIndex)
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
        setRemoveButton("Remove Route")
    }

    const createSelectedStepsPopUpMSG = () => {
        setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected steps
                <PopupWindow
                    type={"warning"}
                    title={"Warning: Confirm Removal"}
                    mainContent={"Are you sure you want to remove the selected steps? This action cannot be undone."}
                    buttonsKey={['yes', 'cancel']}
                    buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                    setUserDecision={setUserDecision} />
        );
        setRemoveButton("Remove Selected (Steps)")
    }

    // DESCRIPTION: Expands\Collapses the route__steps-list section, and updates the state accordingly
    const handleExpandAndCollapse = () => {
        const divStepList = document.getElementsByClassName("route__steps-list")[routeIndex]
        if (routeElement.isExpanded) {
            setIsExpandedFalse(routeIndex)
        }
        else {
            setIsExpandedTrue(routeIndex)
        }
    }

    // DESCRIPTION: Handles the user's decision regarding the removal of a route or selected steps
    useEffect(() => {
        if(userDecision === 'yes')
        {
            switch(removeButton) 
            {
                case 'Remove Route':
                    handleRemoveRoute()
                    break;
                case 'Remove Selected (Steps)':
                    handleRemoveSelectedSteps()
                    break;
                default:
                    break;
            }
            setWarningMessageJSX(null)
            setRemoveButton(null)
            setUserDecision('')
        }
    } , [userDecision , removeButton  , handleRemoveRoute , handleRemoveSelectedSteps])

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
                            <h2>Name: </h2>
                            <input type="text" onChange={handleRouteNameInput} value={routeElement.routeName} />
                        </div>
                        <div className="route__buttons">
                            <button className="route__button--add-step" onClick={handleNewStepInput}>Add Step</button>
                            <button className="route__button--remove-route" onClick={createRoutePopUpMSG}>Remove Route</button>
                            <button className="route__button--remove-selected" onClick={createSelectedStepsPopUpMSG}>Remove Selected Steps</button>
                        </div>
                    </div>

                    <IconButton onClick={handleExpandAndCollapse} className="route__button--expand-collapse" disabled={routeElement.stepList.length == 0}>
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