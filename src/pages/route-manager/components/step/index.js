import useStepValidityStatus from '../../hooks/useStepValidityStatus';

import Checkbox from '../../../../common/components/checkbox';
import InvalidInputMessage from '../invalid-input-message';

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
    const {
        stepRef,
        stepValidityStatus: { isStepValid, errorMessage },
    } = useStepValidityStatus();

    /**
     * @description Takes the value of the direction input upon change and calls an action to update the step's direction.
     * @param {DataTypes.Direction} direction - The new direction of the step.
     */
    const handleDirectionUpdate = (direction) => {
        actions.updateStepDirectionAt(routeIndex, stepIndex, direction);
    };

    /**
     * @description Takes the value of the length input upon change and calls an action to update the step's length.
     * @param {number} length - The new length of the step.
     * @returns {void}
     */
    const handleLengthUpdate = (length) => {
        actions.updateStepLengthAt(routeIndex, stepIndex, length);
    };

    return (
        <div className="route-manager__half-bar step">
            <Checkbox
                onButtonClick={() =>
                    actions.updateStepsCheckStatusAt(
                        !step.isChecked,
                        routeIndex,
                        stepIndex
                    )
                }
                isChecked={step.isChecked}
            />
            <p className="step__text">Step #{stepIndex + 1}</p>
            <div className="step__inputs">
                <span className="step__inputs-group">
                    <label
                        className="step__inputs-group-label"
                        htmlFor={`step-${stepIndex + 1}-length`}
                    >
                        {/* &nbsp; is a non-breaking space */}
                        Length:&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <input
                        id={`step-${stepIndex + 1}-length`}
                        className={`step__inputs-group-input ${step.isDirty && !isStepValid ? 'step__inputs-group-input--error' : ''}`}
                        name={`step length`}
                        type="text"
                        inputMode="numeric"
                        placeholder='e.g. "10"'
                        pattern="([1-9]+.?[0-9]*)|(0.[0-9]*[1-9][0-9]*)" // positive float number
                        maxLength={5}
                        required
                        onChange={({ target: { value } }) => {
                            handleLengthUpdate(Number(value) ?? 0);
                        }}
                        onBlur={() =>
                            actions.markStepAsDirtyAt(routeIndex, stepIndex)
                        }
                        ref={stepRef}
                        aria-invalid={!isStepValid}
                    />
                    <InvalidInputMessage
                        forWho="step"
                        isVisible={step.isDirty && !isStepValid}
                        message={errorMessage}
                    />
                </span>
                <span className="step__inputs-group">
                    <label
                        htmlFor={`step-${stepIndex + 1}-direction`}
                        className="step__inputs-group-label"
                    >
                        Direction:{' '}
                    </label>
                    <select
                        id={`step-${stepIndex + 1}-direction`}
                        className="step__inputs-group-input"
                        name={`step direction`}
                        required
                        defaultValue={step.direction}
                        onChange={({ target: { value } }) =>
                            // @ts-ignore
                            handleDirectionUpdate(value)
                        }
                    >
                        <option value="Forward">Forward</option>
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
                onClick={() => actions.removeStepsFromRouteAt(routeIndex, stepIndex)}
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
