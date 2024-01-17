import useList from '../../../common/hooks/useList';

import { v4 as uuidv4 } from 'uuid';

import * as HookTypes from '../../../common/types/hooks-related.types';
import * as DataTypes from '../../../common/types/data.types';

/**
 * Custom hook for handling routes.
 *
 * @param {DataTypes.Route[]} [initialRouteList=[]] - The initial route list.
 * @return {[DataTypes.Route[], HookTypes.RouteListActions]} - A tuple containing the route list and an object with utility functions for handling the route list.
 *
 * @author Maor Bezalel & Nadav Bitran
 */
export default function useRouteList(initialRouteList) {
    const [routeList, routeListActions] = useList(initialRouteList);

    /** @type {HookTypes.RouteListActions}*/
    const actions = {
        set: (newRouteList) => {
            routeListActions.set(newRouteList);
        },

        addRoutes: (amount) => {
            /** @type {DataTypes.Route[]} */
            const routes = Array.from({ length: amount }, () => ({
                id: uuidv4(),
                name: '',
                isChecked: false,
                isExpanded: false,
                steps: [],
            }));
            routeListActions.add(...routes);
        },
        addRoutesAt: (index, amount) => {
            /** @type {DataTypes.Route[]} */
            const routes = Array.from({ length: amount }, () => ({
                id: uuidv4(),
                name: '',
                isChecked: false,
                isExpanded: false,
                steps: [],
            }));
            routeListActions.addAt(index, ...routes);
        },
        addStepsToRouteAt: (routeIndex, amount) => {
            /** @type {DataTypes.Route} */
            const route = routeList[routeIndex];
            /** @type {DataTypes.Step[]} */
            const steps = Array.from({ length: amount }, () => ({
                id: uuidv4(),
                length: 0,
                direction: 'Foward',
                isChecked: false,
            }));
            routeListActions.updatePropAt(
                'steps',
                [...route.steps, ...steps],
                routeIndex
            );
        },

        updateRouteNameAt: (routeIndex, name) => {
            routeListActions.updatePropAt('name', name, routeIndex);
        },
        updateRoutesCheckStatusAt: (checkStatus, ...routeIndices) => {
            routeListActions.updatePropAt(
                'isChecked',
                checkStatus,
                ...routeIndices
            );
        },
        updateRouteExpansionStatusAt: (routeIndex, expansionStatus) => {
            routeListActions.updatePropAt(
                'isExpanded',
                expansionStatus,
                routeIndex
            );
        },
        updateStepDirectionAt: (routeIndex, stepIndex, direction) => {
            const newRouteList = [...routeList];
            newRouteList[routeIndex].steps[stepIndex].direction = direction;
        },
        updateStepLengthAt: (routeIndex, stepIndex, length) => {
            const newRouteList = [...routeList];
            newRouteList[routeIndex].steps[stepIndex].length = length;
        },
        updateStepsCheckStatusAt: (checkStatus, routeIndex, ...stepIndices) => {
            const newRouteList = [...routeList];
            stepIndices.forEach((stepIndex) => {
                newRouteList[routeIndex].steps[stepIndex].isChecked =
                    checkStatus;
            });
            routeListActions.set(newRouteList);
        },

        checkAllRoutes: () => {
            const newRouteList = [...routeList];
            newRouteList.forEach((route) => {
                route.isChecked = true;
                route.steps = route.steps.map((step) => ({
                    ...step,
                    isChecked: true,
                })); // checking a route checks all of its steps
            });
            routeListActions.set(newRouteList);
        },
        uncheckAllRoutes: () => {
            const newRouteList = [...routeList];
            newRouteList.forEach((route) => {
                route.isChecked = false;
                route.steps = route.steps.map((step) => ({
                    ...step,
                    isChecked: false,
                })); // unchecking a route unchecks all of its steps
            });
            routeListActions.set(newRouteList);
        },

        removeRoutesAt: (...routeIndices) => {
            routeListActions.removeAt(...routeIndices);
        },
        removeStepsFromRouteAt: (routeIndex, ...stepIndices) => {
            const newRouteList = [...routeList];
            stepIndices.forEach((stepIndex) => {
                newRouteList[routeIndex].steps.splice(stepIndex, 1);
            });
            routeListActions.set(newRouteList);
        },
        removeAllCheckedRoutesAndSteps: () => {
            const uncheckedRoutes = routeList.filter(
                (route) => !route.isChecked
            );
            const uncheckedRoutesWithUncheckedSteps = uncheckedRoutes.map(
                (route) => ({
                    ...route,
                    steps: route.steps.filter((step) => !step.isChecked),
                })
            );
            routeListActions.set(uncheckedRoutesWithUncheckedSteps);
        },
        clear: () => {
            routeListActions.clear();
        },
    };

    return [routeList, actions];
}
