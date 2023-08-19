import "../styles/Route.css";

import Step from "./Step";

import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Route(props) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDELERS ----
    // DESCRIPTION: Enters the new name of the route with the appropriate id, and updates the state accordingly
    const handleRouteNameInput = (event) => {
        props.addRouteNameToRoute(event.target.value, props.routeIndex)
    }

    // DESCRIPTION: Enters the updated steps array of the route with the appropriate id, and updates the state accordingly
    const handleNewStepInput = () => {
        props.addStepListToRoute([...props.routeElement.stepList, { length: "", direction: "Foward" }], props.routeIndex)
    }

    // DESCRIPTION: Removes a route from the routesList
    const handleRemoveRoute = () => {
        props.removeRoute(props.routeIndex)
    }

    // DESCRIPTION: Expands\Collapses the route__steps-list section, and updates the state accordingly
    const handleExpandAndCollapse = () => {
        const divStepList = document.getElementsByClassName("route__steps-list")[props.routeIndex]
        props.expandAndCollapse(props.routeElement, divStepList, props.routeIndex)
    }
    // --------------------------------------------------------
    // --------------------------------------------------------


    // --------------------------------------------------------
    // --------------------------------------------------------
    // --- MAPPING ----
    const stepsListJSX = props.routeElement.stepList.map((stepElement, index) => (
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
            routeIndex={props.routeIndex}
            addLengthToStep={props.addLengthToStep}
            addDirectionToStep={props.addDirectionToStep}
            removeStep={props.removeStep}
            stepElement={stepElement}
            updateCheckedStep={props.updateCheckedStep}
        />
    ));
    // --------------------------------------------------------

    return (
        <>
            <div className="route">
                <div className="route__bar">
                    <input type="checkbox" className="route__checkbox" />
                    <h2 className="route__index">Route #{props.routeIndex + 1}</h2>
                    <div className="route__content">
                        <div className="route__name">
                            <h2>Name: </h2>
                            <input type="text" onChange={handleRouteNameInput} value={props.routeElement.routeName} />
                        </div>
                        <div className="route__buttons">
                            <button className="route__button--add-step" onClick={handleNewStepInput}>Add Step</button>
                            <button className="route__button--remove-route" onClick={handleRemoveRoute}>Remove Route</button>
                            <button className="route__button--remove-selected">Remove Selected</button> {/* TODO: Add functionality to this button */}
                        </div>
                    </div>
                    {props.routeElement.stepList.length !== 0 ?
                        <IconButton onClick={handleExpandAndCollapse} className="route__button--expand-collapse">
                            {props.isExpanded ? <ExpandLessIcon className="route__expand-collapse-icon" /> : <ExpandMoreIcon className="route__expand-collapse-icon" />}
                        </IconButton> : null
                    }
                </div>
                <section className={props.isExpanded ? "route__steps-list" : "route__steps-list hidden"}>
                    {stepsListJSX}
                </section>
            </div>
        </>
    );
}
