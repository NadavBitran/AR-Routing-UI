import { useRef } from 'react';

/**
 * @typedef {object} StepValidityStatus
 * @property {boolean} isStepValid - The validity status of the step. `true` if the step length input is valid; otherwise, `false`.
 * @property {string} [errorMessage] - The error message of the step. `undefined` if `isStepValid` is `true`; otherwise, `string`.
 *
 * @typedef {import("react").MutableRefObject<HTMLInputElement>} MutableRefHTMLInputElement
 */

/**
 * Custom hook for handling the validity status of a step.
 *
 * @returns {{stepRef: MutableRefHTMLInputElement, stepValidityStatus: StepValidityStatus}} An object containing a reference to the step length input and the validity status of the step.
 */
export default function useStepValidityStatus() {
    /** @type {MutableRefHTMLInputElement} */
    const stepRef = useRef();

    /**
     * @description Validates the step length input.
     * @returns {StepValidityStatus} The validity status of the step.
     */
    const validateStep = () => {
        if (!stepRef.current) return { isStepValid: true };

        const isLengthInputEmpty = stepRef.current.validity.valueMissing;
        const isLengthInputNotPositiveNumber =
            stepRef.current.validity.patternMismatch;
        const isLengthInputAboveMax = Number(stepRef.current.value) > 10_000;

        /** @type {StepValidityStatus} */
        let stepValidityStatus;

        if (isLengthInputEmpty) {
            stepValidityStatus = {
                isStepValid: false,
                errorMessage: 'Required',
            };
        } else if (isLengthInputNotPositiveNumber) {
            stepValidityStatus = {
                isStepValid: false,
                errorMessage: 'Positive Number Only',
            };
        } else if (isLengthInputAboveMax) {
            stepValidityStatus = {
                isStepValid: false,
                errorMessage: 'Max 10,000',
            };
        } else {
            stepValidityStatus = {
                isStepValid: true,
            };
        }

        return stepValidityStatus;
    };

    return {
        stepRef: stepRef,
        stepValidityStatus: validateStep(),
    };
}
