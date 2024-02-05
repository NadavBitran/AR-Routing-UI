/**
 * @module data.types.ts
 * @description contains all the types used to represent the different data used throughout the application.
 *
 * @author Maor Bezalel
 */

/**
 * @description represents a latitude and longitude coordinate pair.
 * @remarks accepts either an object with `lat` and `lng` properties or an array with the latitude and longitude values in that order.
 * @example
 * ```ts
 * const a: LatLngExpression = { lat: 0, lng: 0};
 * const b: LatLngExpression = [0, 0]; // b[0] = lat, b[1] = lng
 * ```
 */
export type LatLngExpression = import('leaflet').LatLngExpression;

/**
 * @description represents a pixel value in a string format with a `px` suffix.
 * @example
 * ```ts
 * const a: Pixels = '10px'; // correct!
 * const b: Pixels = 10; // incorrect! isn't a string with a `px` suffix
 * const c: Pixels = '10'; // incorrect! doesn't have a `px` suffix
 * const d = 'somethingpx'; // incorrect! doesn't have a number at the beginning
 * ```
 */
export type Pixels = `${number}px`;

/** @description an object representing a route which is made up of steps with direction and length. */
export type Route = {
    /** @description the unique identifier of the route which helps React to distinguish between different rendered steps. */
    id: string;

    /** @description the name of the route. given by the user. */
    name: string;

    /** @description whether the route has been modified by the user. */
    isDirty: boolean;

    /** @description whether the route is currently selected (via a checkbox). */
    isChecked: boolean;

    /** @description whether the route is currently expanded to show its steps. */
    isExpanded: boolean;

    /** @description the steps that make up the route. */
    steps: Step[];
};

/** @description an object representing a step which belong to a specific route.*/
export type Step = {
    /** @description the unique identifier of the step which helps React to distinguish between different rendered steps. */
    id: string;

    /** @description the length (in meters) of the step. */
    length: number;

    /** @description the direction of the step. */
    direction: Direction;

    /** @description whether the step has been modified by the user. */
    isDirty: boolean;

    /** @description whether the step is currently selected (via a checkbox). */
    isChecked: boolean;
};

/** @description an object representing the validation status of specific route*/
export type RouteValidation = {
    /** @description whether the route name is currently valid. */
    isNameValid: boolean;

    /** @description error message indicating what went wrong */
    errorMessage: string;
};

/** @description an object representing the validation status of specific step*/
export type StepValidation = {
    /** @description whether the step's length is currently valid */
    isLengthValid: boolean;

    /** @description whether the step's direction is currently valid */
    isDirectionValid: boolean;

    /** @description error message indicating what went wrong */
    errorMessage: string;
};

/**
 *  @description the different directions a step can have.
 */
export type Direction =
    | 'Forward'
    | 'Forward-Left'
    | 'Forward-Right'
    | 'Left'
    | 'Right'
    | 'Backward'
    | 'Backward-Left'
    | 'Backward-Right';

/** @description an object representing the essential data for rendering an image. */
export type Image = {
    /** @description the source of the image. */
    src: string;

    /** @description the alternative text of the image. */
    alt: string;
};

/** @description an object representing the essential data for rendering a button. */
export type Button = {
    /** @description the text that will appear on the button. */
    text: string;

    /** @description the function that will be called when the button is clicked. */
    action: () => void;
};

/**
 * @description represents where a tooltip should be positioned relative to its target.
 * @remarks used to render a specific tooltip css class.
 */
export type TooltipPositionRelativeToTarget =
    | 'top'
    | 'topRight'
    | 'topLeft'
    | 'right'
    | 'buttomRight'
    | 'buttom'
    | 'buttomLeft'
    | 'left';

/** @description an object representing the coordinates of a tooltip in pixels. */
export type TooltipCoordinates = {
    /** @description the height of the tooltip in pixels. */
    height: Pixels;

    /** @description the width of the tooltip in pixels. */
    width: Pixels;

    /** @description the middle x coordinate of the tooltip in pixels. */
    middleX: Pixels;

    /** @description the middle y coordinate of the tooltip in pixels. */
    middleY: Pixels;
};

export type AppData = {
    /** @description the saved route list of the user */
    routeList: Route[];

    /** @description the saved latlng of the user */
    latlng: LatLngExpression;
};
