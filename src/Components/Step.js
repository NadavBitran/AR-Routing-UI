import "../styles/Step.css";

export default function Step(props) {
    // --------------------------------------------------------
    // ---- HANDLERS ----
    // DESCRIPTION: Enters the length of the step in the step's route accordingly
    const handleLengthInput = (event) => {
        props.addLengthToStep(event.target.value, props.stepId, props.routeId);
    }

    // DESCRIPTION: Enters the direction of the step in the step's route accordingly
    const handleDirectionInput = (event) => {
        props.addDirectionToStep(event.target.value, props.stepId, props.routeId);
    }

    // DESCRIPTION: Removes the step from the step's route accordingly
    const handleRemoveStep = () => {
        props.removeStep(props.stepId, props.routeId);
    }
    // --------------------------------------------------------

    // ---- JSX ----
    return (
        <div className="step">
            <h3 className="step__index">Step #{props.stepIndex + 1}</h3>
            <div className="step__content">
                <div className="step__length">
                    <h3>Length: </h3>
                    <input type="text" onChange={handleLengthInput}></input>
                </div>
                <div className="step__direction">
                    <h3>Direction: </h3>
                    <select onChange={handleDirectionInput}>
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
            <button className="step__button--expand-collapse">Expand/Collapse</button> {/* TODO: Add functionality to this button */}
        </div>
    );
}