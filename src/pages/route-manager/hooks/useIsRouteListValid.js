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
    updateRouteExpansionStatusAt,
    makeStepDirty,
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
        const routeListElement = routeListRef.current;
        /** @type {NodeListOf<HTMLInputElement>} */
        const routeListRoutesNameInputElements = routeListElement.querySelectorAll(
            'input[name="route name"]'
        );

        routeListRoutesNameInputElements.forEach(
            (routeNameInputElement, routeIndex) => {
                /** @type {NodeListOf<HTMLInputElement>} */
                const routeListStepsLengthInputElements =
                    routeListElement.querySelectorAll(
                        `#route-${routeIndex + 1} ~ ul input[name="step length"]`
                    );
                const isRouteValid = routeNameInputElement.validity.valid;
                let hasAllStepsWithValidLength = true;

                routeListStepsLengthInputElements.forEach(
                    (stepLengthInputElement, stepIndex) => {
                        hasAllStepsWithValidLength &&=
                            stepLengthInputElement.validity.valid;
                        makeStepDirty(routeIndex, stepIndex);
                    }
                );

                if (!hasAllStepsWithValidLength) {
                    updateRouteExpansionStatusAt(routeIndex, true);
                }

                // Trigger input dirtyness to make it possible to show the error message
                routeNameInputElement.focus();
                routeNameInputElement.blur();

                isRouteListValid &&= isRouteValid && hasAllStepsWithValidLength;
            }
        );

        return isRouteListValid;
    };

    return {
        routeListRef: routeListRef,
        isRouteListValid: isRouteListValid,
    };
}
