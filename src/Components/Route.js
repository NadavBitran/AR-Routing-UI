import "../styles/Route.css";

import Step from "./Step";

import {useState} from 'react';

export default function Route(props) {
    // --- USE STATES ----
    // isExpanded:
    //           If "true" -> the route__steps-list section is expanded
    //           If "no"   -> the route__steps-list section is collapsed 
    const [isExpanded ,setIsExpanded] = useState(true) 

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
                            <button className="route__button--remove-selected" onClick={handleRemoveSelectedSteps}>Remove Selected</button> 
                        </div>
                    </div>
                    <button className="route__button--expand-collapse" onClick={handleExpandAndCollapse}>{isExpanded ? <span>Collapse</span> : <span>Expand</span>}</button> 
                </div>
                <section className="route__steps-list">
                    {stepsListJSX}
                </section>
            </div>
        </>
    );
}