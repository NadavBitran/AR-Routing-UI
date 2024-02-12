import { useRef } from 'react';

/**
 * @typedef {object} RouteValidityStatus
 * @property {boolean} isRouteValid - The validity status of the route. `true` if the route name input is valid; otherwise, `false`.
 * @property {string} [errorMessage] - The error message of the route. `undefined` if `isRouteValid` is `true`; otherwise, `string`.
 *
 * @typedef {import("react").MutableRefObject<HTMLInputElement>} MutableRefHTMLInputElement
 */

/**
 * Custom hook for handling the validity status of a route.
 *
 * @returns {{routeRef: MutableRefHTMLInputElement, routeValidityStatus: RouteValidityStatus}} An object containing a reference to the route name input and the validity status of the route.
 */
export default function useRouteValidityStatus() {
    /** @type {MutableRefHTMLInputElement} */
    const routeRef = useRef();

    /**
     * @description Validates the route name input.
     * @returns {RouteValidityStatus} The validity status of the route.
     */
    const validateRoute = () => {
        if (!routeRef.current) return { isRouteValid: true };

        const isNameInputEmpty = routeRef.current.validity.valueMissing;
        const isNameInputNotEnglish = routeRef.current.validity.patternMismatch;

        /** @type {RouteValidityStatus} */
        let routeValidityStatus;

        if (isNameInputEmpty) {
            routeValidityStatus = {
                isRouteValid: false,
                errorMessage: 'Required',
            };
        } else if (isNameInputNotEnglish) {
            routeValidityStatus = {
                isRouteValid: false,
                errorMessage: 'English Only',
            };
        } else {
            routeValidityStatus = {
                isRouteValid: true,
            };
        }

        return routeValidityStatus;
    };

    return {
        routeRef: routeRef,
        routeValidityStatus: validateRoute(),
    };
}
