import useList from '../../../common/hooks/useList';
import useCheckedItems from './useCheckedItems';
import useExpandedRoutes from './useExpandedRoutes';

import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @typedef {object} Route - An object representing a route.
 * @property {string} id - The id of the route.
 * @property {string} name - The name of the route.
 * @property {Array<Step>} steps - The steps of the route.
 *
 * @typedef {object} Step - An object representing a step.
 * @property {string} id - The id of the step.
 * @property {number} length - The length of the step.
 * @property {Direction} direction - The direction of the step.
 *
 * @typedef {"Foward"|"Forward-Left"|"Forward-Right"|"Left"|"Right"|"Backward"|"Backward-Left"|"Backward-Right"} Direction
 *
 * @typedef {object} Actions - An object containing utility functions.
 *
 * @property {(name: string) => void} addRoute - Adds a route to the route list.
 * @property {(routeIndex: number) => void} addStep - Adds a step to a route.
 *
 * @property {(index: number) => void} removeRoute - Removes a route from the route list. Also removes the route from the checked items and expanded routes maps if it exists there.
 * @property {(routeIndex: number, stepIndex: number) => void} removeStep - Removes a step from a route. Also removes the step from the checked items map if it exists there.
 *
 * @property {(routeIndex: number, name: string) => void} updateRouteName - Updates the name of a route.
 * @property {(routeIndex: number, stepIndex: number, length: number) => void} updateStepLength - Updates the length of a step.
 * @property {(routeIndex: number, stepIndex: number, direction: Direction) => void} updateStepDirection - Updates the direction of a step.
 *
 * @property {(routeId: string) => void} checkRoute - Checks a route.
 * @property {(routeId: string, stepId: string) => void} checkStep - Checks a step.
 * @property {(routeId: string) => void} checkAllSteps - Checks all steps of a specified route.
 * @property {(routeId: string) => void} uncheckRoute - Unchecks a route.
 * @property {(routeId: string, stepId: string) => void} uncheckStep - Unchecks a step.
 * @property {(routeId: string) => void} uncheckAllSteps - Unchecks all steps of a specified route.
 *
 * @property {(routeId: string) => void} expandRoute - Expands a route.
 * @property {(routeId: string) => void} collapseRoute - Collapses a route.
 * @property {(routeId: string) => void} toggleRouteExpansion - Toggles a route expansion state.
 *
 */

/**
 * Custom hook for handling routes.
 *
 * @param {Array<Route>} initialRouteList - The initial route list.
 */
export default function useRouteList(initialRouteList) {
    const [routeList, routeListActions] = useList(initialRouteList);
    const [checkedItems, checkedItemsActions] = useCheckedItems({});
    const [expandedRoutes, expandedRoutesActions] = useExpandedRoutes({});

    /** @type {Actions} */
    const actions = {
        addRoute: (name) => {
            /** @type {Route} */
            const route = {
                id: uuidv4(),
                name,
                steps: [],
            };
            routeListActions.push(route);
            expandedRoutesActions.add(route.id);
        },
        addStep: (routeIndex) => {
            const route = routeList[routeIndex];
            /** @type {Step} */
            const step = {
                id: uuidv4(),
                length: 0,
                direction: 'Foward',
            };
            routeListActions.updateAt(routeIndex, {
                ...route,
                steps: [...route.steps, step],
            });
        },

        removeRoute: (routeIndex) => {
            const route = routeList[routeIndex];
            routeListActions.removeAt(routeIndex);
            checkedItemsActions.removeRoute(route.id);
            expandedRoutesActions.remove(route.id);
        },

        removeStep: (routeIndex, stepIndex) => {
            const route = routeList[routeIndex];
            const step = route.steps[stepIndex];
            routeListActions.updateAt(routeIndex, {
                ...route,
                steps: route.steps.filter((_, index) => index !== stepIndex),
            });
            checkedItemsActions.removeStep(route.id, step.id);
        },

        updateRouteName: (routeIndex, name) => {
            const route = routeList[routeIndex];
            routeListActions.updateAt(routeIndex, { ...route, name });
        },

        updateStepLength: (routeIndex, stepIndex, length) => {
            const route = routeList[routeIndex];
            const step = route.steps[stepIndex];
            routeListActions.updateAt(routeIndex, {
                ...route,
                steps: route.steps.map((step, index) =>
                    index === stepIndex ? { ...step, length } : step
                ),
            });
        },

        updateStepDirection: (routeIndex, stepIndex, direction) => {
            const route = routeList[routeIndex];
            const step = route.steps[stepIndex];
            routeListActions.updateAt(routeIndex, {
                ...route,
                steps: route.steps.map((step, index) =>
                    index === stepIndex ? { ...step, direction } : step
                ),
            });
        },

        checkRoute: (routeId) => {
            checkedItemsActions.checkRoute(routeId);
            checkedItemsActions.checkAllSteps(routeId);
        },

        checkStep: (routeId, stepId) => {
            checkedItemsActions.checkStep(routeId, stepId);
        },

        checkAllSteps: (routeId) => {
            checkedItemsActions.checkAllSteps(routeId);
        },

        uncheckRoute: (routeId) => {
            checkedItemsActions.uncheckRoute(routeId);
            checkedItemsActions.uncheckAllSteps(routeId);
        },

        uncheckStep: (routeId, stepId) => {
            checkedItemsActions.uncheckStep(routeId, stepId);
        },

        uncheckAllSteps: (routeId) => {
            checkedItemsActions.uncheckAllSteps(routeId);
        },

        expandRoute: (routeId) => {
            expandedRoutesActions.add(routeId);
        },

        collapseRoute: (routeId) => {
            expandedRoutesActions.remove(routeId);
        },

        toggleRouteExpansion: (routeId) => {
            expandedRoutesActions.toggle(routeId);
        },
    };

    return [routeList, actions];
}
