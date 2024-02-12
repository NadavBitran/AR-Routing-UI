import { useRef } from 'react';
import * as HookTypes from '../../../common/types/hooks-related.types';

/**
 * @typedef {import("react").MutableRefObject<HTMLUListElement>} MutableRefHTMLUListElement
 */

/**
 * Custom hook for checking if all the routes and steps in the route list contain valid input data.
 * Also expand any route that contains invalid steps.
 *
 * @param {HookTypes.IsRouteListValidActions} actions - An object containing specific actions to execute when checking the validity of the route list.
 * @returns {{routeListRef: MutableRefHTMLUListElement, isRouteListValid: () => boolean}} An object containing a reference to the route list and a function for checking if all the routes and steps in the route list contain valid input data.
 */
export default function useIsRouteListValid({
    updateRoutesExpansionStatusAt,
    markAllAsDirty: markAllAsDirty,
}) {
    /**@type {MutableRefHTMLUListElement} */
    const routeListRef = useRef();

    /**
     * @description Checks if all the routes and steps in the route list contain valid input data.
     * Also expand any route that contains invalid steps.
     * @returns {boolean} `true` if all the routes and steps in the route list contain valid input data; otherwise, `false`.
     */
    const isRouteListValid = () => {
        let isRouteListValid = true;
        const indicesOfRoutesWithInvalidSteps = [];

        const routesNameInputElements = getAllRoutesNameInputElements();
        routesNameInputElements.forEach((routeNameInputElement, index) => {
            const stepsLengthInputElements =
                getAllStepsLengthInputElementsOfRouteAt(index);
            const isRouteValid = routeNameInputElement.validity.valid;
            let hasAllStepsWithValidLength = true;

            stepsLengthInputElements.forEach((stepLengthInputElement, stepIndex) => {
                const isStepValid =
                    stepLengthInputElement.validity.valid &&
                    Number(stepLengthInputElement.value) <= 10_000;
                hasAllStepsWithValidLength &&= isStepValid;
            });

            if (!hasAllStepsWithValidLength) {
                indicesOfRoutesWithInvalidSteps.push(index);
            }

            isRouteListValid &&= isRouteValid && hasAllStepsWithValidLength;
        });

        if (!isRouteListValid) {
            if (indicesOfRoutesWithInvalidSteps.length > 0) {
                updateRoutesExpansionStatusAt(
                    true,
                    ...indicesOfRoutesWithInvalidSteps
                );
            }
            markAllAsDirty();
        }

        return isRouteListValid;
    };

    /**
     *
     * @returns {NodeListOf<HTMLInputElement>}
     */
    const getAllRoutesNameInputElements = () => {
        const routeListElement = routeListRef.current;
        return routeListElement.querySelectorAll('input[name="route name"]');
    };

    /**
     *
     * @param {number} routeIndex - The index of the route.
     * @returns {NodeListOf<HTMLInputElement>}
     */
    const getAllStepsLengthInputElementsOfRouteAt = (routeIndex) => {
        const routeListElement = routeListRef.current;
        return routeListElement.querySelectorAll(
            `#route-${routeIndex + 1} ~ ul input[name="step length"]`
        );
    };

    return {
        routeListRef: routeListRef,
        isRouteListValid: isRouteListValid,
    };
}
