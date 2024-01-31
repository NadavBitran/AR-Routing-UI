import Checkbox from '../../../../common/components/checkbox';

import trashBinPNG from '../../assets/remove-selected-trash-bin.png';
import * as DataTypes from '../../../../common/types/data.types';
import * as HookTypes from '../../../../common/types/hooks-related.types';

import './styles.css';

/**
 * @typedef {object} StepProps
 * @property {DataTypes.Step} step - The step.
 * @property {number} stepIndex - The step's index in the route list.
 * @property {number} routeIndex - The step's route index in the route list.
 * @property {HookTypes.StepActions} actions - An object containing specific actions for handling a step in the route list.
 */

/**
 * Represent a step of a route in the route list.
 *
 * @param {StepProps} props - The component props.
 * @returns {React.JSX.Element}
 *
 * @author Maor Bezalel
 */
export default function Step({ step, stepIndex, routeIndex, actions }) {
    return (
        <div className="route-manager__half-bar step">
            <Checkbox />
            <p className="step__text">Step #{stepIndex}</p>
            <div className="step__inputs">
                <span className="step__inputs-group">
                    <label
                        className="step__inputs-group-label"
                        htmlFor={`step-${stepIndex}-length`}
                    >
                        {/* &nbsp; is a non-breaking space */}
                        Length:&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                        id={`step-${stepIndex}-length`}
                        className="step__inputs-group-input"
                        name={`step #${stepIndex} length`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder='e.g. "10"'
                        required
                    />
                </span>
                <span className="step__inputs-group">
                    <label
                        htmlFor={`step-${stepIndex}-direction`}
                        className="step__inputs-group-label"
                    >
                        Direction:{' '}
                    </label>
                    <select
                        id={`step-${stepIndex}-direction`}
                        className="step__inputs-group-input"
                        name={`step #${stepIndex} direction`}
                        required
                    >
                        <option value="Foward">Foward</option>
                        <option value="Forward-Left">Forward-Left</option>
                        <option value="Forward-Right">Forward-Right</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                        <option value="Backward">Backward</option>
                        <option value="Backward-Left">Backward-Left</option>
                        <option value="Backward-Right">Backward-Right</option>
                    </select>
                </span>
            </div>
            <button
                className="step__remove-button"
                onClick={() =>
                    actions.removeStepsFromRouteAt(routeIndex, stepIndex)
                }
            >
                <img
                    className="step__remove-button-icon"
                    src={trashBinPNG}
                    alt="Remove Step"
                />
            </button>
        </div>
    );
}
