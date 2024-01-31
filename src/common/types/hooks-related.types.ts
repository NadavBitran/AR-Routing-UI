/**
 * @module types/hooks-related
 * @description contains all the types used to represent hooks-related data and functions.
 *
 * @author Maor Bezalel
 */

import { LatLngExpression, Direction, Route } from './data.types';

/**
 * @description the type of the function that sets state returned by React's `useState` hook.
 * @template TState - the type of the state
 */
export type SetState<TState> = import('react').Dispatch<
    import('react').SetStateAction<TState>
>;

/**
 * @description the return type of the `useMarkerLocation` hook.
 */
export type UseMarkerLocationResults = {
    /** @description the current location of the marker. */
    markerLocation: LatLngExpression;

    /** @description a function that updates the location of the marker. */
    updateMarkerLocation: (
        latlng: LatLngExpression,
        updatedFrom: string
    ) => void;

    /** @description a function that resets the location of the marker to its default value. */
    latestMarkerUpdateOperation: string;
};

/**
 * @description Represents a set of actions that can be performed on a list of items.
 * @template TItem - The type of items in the list.
 * @remarks This type is used to represent one of the return values of the `useList` hook.
 */
export type ListActions<TItem> = {
    /**
     * @description Sets a new list of items in place of the old one.
     * @param items - The new list of items.
     */
    set: (items: TItem[]) => void;

    /**
     * @description Adds a single or multiple items to the end of the list.
     * @param item - The item(s) to be added.
     */
    add: (...item: TItem[]) => void;

    /**
     * @description Adds a single or multiple items at the specified index.
     * @param index - The index at which the items should be added.
     * @param item - The item(s) to be added.
     */
    addAt: (index: number, ...item: TItem[]) => void;

    /**
     * @description Removes a single or multiple items from the list at the specified index(es).
     * @param indices - The indices of the items to be removed.
     */
    removeAt: (...indices: number[]) => void;

    /**
     * @description Updates a single item in the list at the specified index.
     * @param item - The new value of the item.
     * @param indices - the index of one or more items to be updated.
     */
    updateAt: (item: TItem, ...indices: number[]) => void;

    /**
     * @description Updates a single property of an item in the list at the specified index.
     * @template TProp - The type of the property to update.
     * @param prop - The property to update.
     * @param newValue - The new value of the property.
     * @param indices - The indices of the items to be removed.
     * @remarks This is relevant only for items in the list that are objects.
     */
    updatePropAt: <TProp extends keyof TItem>(
        prop: TProp,
        newValue: TItem[TProp],
        ...indices: number[]
    ) => void;

    /** @description Removes all items from the list (equivalent to setting an empty list). */
    clear: () => void;
};

/**
 * @description Represents a set of actions that can be performed on a list of routes.
 * @remarks This type is used to represent one of the return values of the `useRouteList` hook.
 */
export type RouteListActions = {
    /**
     * @description sets a new list of routes in place of the old one.
     * @param routes - The new list of routes.
     */
    set: (routes: Route[]) => void;

    /**
     * @description adds a single or multiple routes to the end of the list.
     * @param amount - The number of routes to be added.
     */
    addRoutes: (amount: number) => void;

    /**
     * @description adds a single or multiple routes at the specified index.
     * @param index - The index at which the routes should be added.
     * @param amount - The number of routes to be added.
     */
    addRoutesAt: (index: number, amount: number) => void;

    /**
     * @description adds steps to a route at the specified index.
     * @param routeIndex - The index of the route.
     * @param amount - The number of steps to be added.
     */
    addStepsToRouteAt: (routeIndex: number, amount: number) => void;

    /**
     * @description removes a single or multiple routes from the list at the specified index(es).
     * @param indices - The indices of the routes to be removed.
     */
    removeRoutesAt: (...indices: number[]) => void;

    /**
     * @description removes steps from a route at the specified index.
     * @param routeIndex - The index of the route.
     * @param stepIndices - The indices of the steps to be removed.
     */
    removeStepsFromRouteAt: (
        routeIndex: number,
        ...stepIndices: number[]
    ) => void;

    /** @description removes all checked routes and steps from the list. */
    removeAllCheckedRoutesAndSteps: () => void;

    /**
     * @description updates the name of a route at the specified index.
     * @param index - The index of the route.
     * @param name - The new name of the route.
     */
    updateRouteNameAt: (index: number, name: string) => void;

    /**
     * @description updates the check status of routes at the specified indices.
     * @param checkStatus - The new check status.
     * @param routeIndices - The indices of the routes to be updated.
     */
    updateRoutesCheckStatusAt: (
        checkStatus: boolean,
        ...routeIndices: number[]
    ) => void;

    /**
     * @description updates the expansion status of a route at the specified index.
     * @param index - The index of the route.
     * @param expansionStatus - The new expansion status.
     */
    updateRouteExpansionStatusAt: (
        index: number,
        expansionStatus: boolean
    ) => void;

    /**
     * @description updates the direction of a step in a route.
     * @param routeIndex - The index of the route.
     * @param stepIndex - The index of the step.
     * @param direction - The new direction of the step.
     */
    updateStepDirectionAt: (
        routeIndex: number,
        stepIndex: number,
        direction: Direction
    ) => void;

    /**
     * @description updates the length of a step in a route.
     * @param routeIndex - The index of the route.
     * @param stepIndex - The index of the step.
     * @param length - The new length of the step.
     */
    updateStepLengthAt: (
        routeIndex: number,
        stepIndex: number,
        length: number
    ) => void;

    /**
     * @description updates the check status of steps in a route.
     * @param checkStatus - The new check status.
     * @param routeIndex - The index of the route.
     * @param stepIndices - The indices of the steps to be updated.
     */
    updateStepsCheckStatusAt: (
        checkStatus: boolean,
        routeIndex: number,
        ...stepIndices: number[]
    ) => void;

    /** @description checks all routes. */
    checkAllRoutes: () => void;

    /** @description unchecks all routes. */
    uncheckAllRoutes: () => void;

    /** @description Removes all routes and steps from the list. */
    clear: () => void;
};

/**
 * @description Represents a set of actions related to a single route that  will be given to the `Route` component.
 * @see {@link Route}
 */
export type RouteActions = Pick<
    RouteListActions,
    | 'updateRouteNameAt'
    | 'updateRouteExpansionStatusAt'
    | 'updateRoutesCheckStatusAt'
    | 'removeRoutesAt'
>;

/**
 * @description Represents a set of actions related to a single step that will be given to the `Step` component.
 * @see {@link Step}
 */
export type StepActions = Pick<
    RouteListActions,
    | 'updateStepDirectionAt'
    | 'updateStepLengthAt'
    | 'updateStepsCheckStatusAt'
    | 'removeStepsFromRouteAt'
>;
