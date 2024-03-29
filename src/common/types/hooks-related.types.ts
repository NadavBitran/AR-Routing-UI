/**
 * @module types/hooks-related
 * @description contains all the types used to represent hooks-related data and functions.
 *
 * @author Maor Bezalel
 */

import {
    LatLngExpression,
    Direction,
    Route,
    RouteValidation,
    StepValidation,
} from './data.types';

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
    updateMarkerLocation: (latlng: LatLngExpression, updatedFrom: string) => void;

    /** @description a value which saves the user's latest marker update operation. */
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
     * @param indices - The indices of the items to be updated.
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
    removeStepsFromRouteAt: (routeIndex: number, ...stepIndices: number[]) => void;

    /** @description removes all checked routes and steps from the list. */
    removeAllCheckedRoutesAndSteps: () => void;

    /**
     * @description updates the name of a route at the specified index.
     * @param index - The index of the route.
     * @param name - The new name of the route.
     */
    updateRouteNameAt: (index: number, name: string) => void;

    /**
     * @description updates the check status of all the routes at the specified indices.
     * @param checkStatus - The new check status.
     * @param routeIndices - The indices of the routes to be updated.
     */
    updateRoutesCheckStatusAt: (
        checkStatus: boolean,
        ...routeIndices: number[]
    ) => void;

    /**
     * @description updates the expansion status of all the routes at the specified indices.
     * @param expansionStatus - The new expansion status.
     * @param routeIndices - The indices of the routes to be updated.
     */
    updateRoutesExpansionStatusAt: (
        expansionStatus: boolean,
        ...routeIndices: number[]
    ) => void;

    /**
     * @description set `true` the dirtyness status of a route at the specified index.
     * @param routeIndex - The index of the route.
     */
    markRouteAsDirtyAt: (routeIndex: number) => void;

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

    /**
     * @description set `true` the dirtyness status of a step in a route.
     * @param routeIndex - The index of the route.
     * @param stepIndex - The index of the step.
     */
    markStepAsDirtyAt: (routeIndex: number, stepIndex: number) => void;

    /**
     * @description update the dirty status of all the steps in the specified routes indices.
     * @param routeIndices - The indices of the routes to be updated.
     */
    markAllAsDirty: () => void;

    /** @description checks all routes and steps in the list. */
    checkAll: () => void;

    /** @description unchecks all routes and steps in the list. */
    uncheckAll: () => void;

    /** @description checks whether all routes and steps in the list are currently checked. */
    areAllRoutesAndStepsChecked: () => boolean;

    /** @description Removes all routes and steps from the list. */
    clear: () => void;
};

/**
 * @description Represents a set of actions related to a single route that  will be given to the `Route` component.
 * @see [Route](../../pages/route-manager/components/route/index.js)
 */
export type RouteActions = Pick<
    RouteListActions,
    | 'updateRouteNameAt'
    | 'updateRoutesExpansionStatusAt'
    | 'updateRoutesCheckStatusAt'
    | 'markRouteAsDirtyAt'
    | 'removeRoutesAt'
>;

/**
 * @description Represents a set of actions related to a single step that will be given to the `Step` component.
 * @see [Step](../../pages/route-manager/components/step/index.js)
 */
export type StepActions = Pick<
    RouteListActions,
    | 'updateStepDirectionAt'
    | 'updateStepLengthAt'
    | 'updateStepsCheckStatusAt'
    | 'markStepAsDirtyAt'
    | 'removeStepsFromRouteAt'
>;

/**
 * @description Represents a set of actions related to routes and steps in the route list that will be given to the `ControllerMenu` component.
 * @see [ControlerMenu](../../pages/route-manager/components/controller-menu/index.js)
 */
export type ControllerMenuActions = Pick<
    RouteListActions,
    | 'checkAll'
    | 'uncheckAll'
    | 'removeAllCheckedRoutesAndSteps'
    | 'areAllRoutesAndStepsChecked'
    | 'clear'
>;

/**
 * @description Represents a set of actions that can be performed on a list of route validations.
 * @see [useIsRouteListValid](../../pages/route-manager/hooks/useIsRouteListValid.js)
 */
export type IsRouteListValidActions = Pick<
    RouteListActions,
    'updateRoutesExpansionStatusAt' | 'markAllAsDirty'
>;
