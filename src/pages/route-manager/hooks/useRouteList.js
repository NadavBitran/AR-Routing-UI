import { useList, useStatelessCounter } from '../../../common/hooks';

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
    const routesAndSteps = useStatelessCounter(0);
    const checkedRoutesAndSteps = useStatelessCounter(0);

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
                isDirty: false,
                isChecked: false,
                isExpanded: false,
                steps: [],
            }));
            routesAndSteps.countUp(amount);
            routeListActions.add(...routes);
        },
        addRoutesAt: (index, amount) => {
            /** @type {DataTypes.Route[]} */
            const routes = Array.from({ length: amount }, () => ({
                id: uuidv4(),
                name: '',
                isDirty: false,
                isChecked: false,
                isExpanded: false,
                steps: [],
            }));
            routesAndSteps.countUp(amount);
            routeListActions.addAt(index, ...routes);
        },
        addStepsToRouteAt: (routeIndex, amount) => {
            const newRouteList = [...routeList];
            /**@type {DataTypes.Step[]} */ const steps = Array.from(
                { length: amount },
                () => ({
                    id: uuidv4(),
                    length: 0,
                    direction: 'Forward',
                    isChecked: false,
                    isDirty: false,
                })
            );
            newRouteList[routeIndex].steps.push(...steps);
            newRouteList[routeIndex].isExpanded = true; // route automatically expands when adding steps
            routesAndSteps.countUp(amount);
            routeListActions.set(newRouteList);
        },

        updateRouteNameAt: (routeIndex, name) => {
            const newRouteList = [...routeList];
            newRouteList[routeIndex].name = name;
            newRouteList[routeIndex].isDirty = true;
            routeListActions.set(newRouteList);
        },
        updateRoutesCheckStatusAt: (checkStatus, ...routeIndices) => {
            if (checkStatus) checkedRoutesAndSteps.countUp(routeIndices.length);
            else checkedRoutesAndSteps.countDown(routeIndices.length);
            routeListActions.updatePropAt('isChecked', checkStatus, ...routeIndices);
        },
        updateRoutesExpansionStatusAt: (expansionStatus, ...routeIndices) => {
            routeListActions.updatePropAt(
                'isExpanded',
                expansionStatus,
                ...routeIndices
            );
        },
        markRouteAsDirtyAt: (routeIndex) => {
            if (!routeList[routeIndex].isDirty) {
                routeListActions.updatePropAt('isDirty', true, routeIndex);
            }
        },

        updateStepDirectionAt: (routeIndex, stepIndex, direction) => {
            const newRouteList = [...routeList];
            newRouteList[routeIndex].steps[stepIndex].direction = direction;
            routeListActions.updatePropAt(
                'steps',
                newRouteList[routeIndex].steps,
                routeIndex
            );
        },
        updateStepLengthAt: (routeIndex, stepIndex, length) => {
            const newRouteList = [...routeList];
            newRouteList[routeIndex].steps[stepIndex].length = length;
            newRouteList[routeIndex].steps[stepIndex].isDirty = true;
            routeListActions.updatePropAt(
                'steps',
                newRouteList[routeIndex].steps,
                routeIndex
            );
        },
        updateStepsCheckStatusAt: (checkStatus, routeIndex, ...stepIndices) => {
            const newRouteList = [...routeList];
            stepIndices.forEach((stepIndex) => {
                newRouteList[routeIndex].steps[stepIndex].isChecked = checkStatus;
            });
            if (checkStatus) checkedRoutesAndSteps.countUp(stepIndices.length);
            else checkedRoutesAndSteps.countDown(stepIndices.length);
            routeListActions.set(newRouteList);
        },
        markStepAsDirtyAt: (routeIndex, stepIndex) => {
            if (!routeList[routeIndex].steps[stepIndex].isDirty) {
                const newRouteList = [...routeList];
                newRouteList[routeIndex].steps[stepIndex].isDirty = true;
                routeListActions.set(newRouteList);
            }
        },

        markAllAsDirty: () => {
            const newRouteList = [...routeList];
            newRouteList.forEach((route) => {
                route.isDirty = true;
                route.steps.forEach((step) => {
                    step.isDirty = true;
                });
            });
            routeListActions.set(newRouteList);
        },
        checkAll: () => {
            const newRouteList = [...routeList];
            newRouteList.forEach((route) => {
                route.isChecked = true;
                route.steps = route.steps.map((step) => ({
                    ...step,
                    isChecked: true,
                })); // checking a route checks all of its steps
            });
            checkedRoutesAndSteps.setCountTo(routesAndSteps.count);
            routeListActions.set(newRouteList);
        },
        uncheckAll: () => {
            const newRouteList = [...routeList];
            newRouteList.forEach((route) => {
                route.isChecked = false;
                route.steps = route.steps.map((step) => ({
                    ...step,
                    isChecked: false,
                })); // unchecking a route unchecks all of its steps
            });
            checkedRoutesAndSteps.setCountTo(0);
            routeListActions.set(newRouteList);
        },

        removeRoutesAt: (...routeIndices) => {
            routesAndSteps.countDown(countAllRoutesAndTheirStepsAt(...routeIndices));
            checkedRoutesAndSteps.countDown(
                countAllTheCheckedRoutesAndStepsAt(...routeIndices)
            );
            routeListActions.removeAt(...routeIndices);
        },
        removeStepsFromRouteAt: (routeIndex, ...stepIndices) => {
            const newRouteList = [...routeList];
            stepIndices.forEach((stepIndex) => {
                newRouteList[routeIndex].steps.splice(stepIndex, 1);
            });
            routesAndSteps.countDown(stepIndices.length);
            checkedRoutesAndSteps.countDown(
                countAllCheckedStepsAt(routeIndex, ...stepIndices)
            );
            routeListActions.set(newRouteList);
        },
        removeAllCheckedRoutesAndSteps: () => {
            if (checkedRoutesAndSteps.count === 0) return;
            const uncheckedRoutes = routeList.filter((route) => !route.isChecked);
            const uncheckedStepsOfUncheckedRoutes = uncheckedRoutes.map((route) => ({
                ...route,
                steps: route.steps.filter((step) => !step.isChecked),
            }));
            routesAndSteps.countDown(
                routesAndSteps.count - checkedRoutesAndSteps.count
            );
            checkedRoutesAndSteps.setCountTo(0);
            routeListActions.set(uncheckedStepsOfUncheckedRoutes);
        },
        clear: () => {
            if (routesAndSteps.count === 0) return;
            routesAndSteps.setCountTo(0);
            checkedRoutesAndSteps.setCountTo(0);
            routeListActions.clear();
        },

        areAllRoutesAndStepsChecked: () => {
            return routesAndSteps.count === checkedRoutesAndSteps.count;
        },
    };

    /**
     * @description Counts the total number of steps in the specified routes, including the routes themselves.
     * @param {...number} routeIndices - The indices of the routes to count.
     * @returns {number} - The total number of steps in the specified routes.
     */
    const countAllRoutesAndTheirStepsAt = (...routeIndices) => {
        return routeIndices.reduce((count, routeIndex) => {
            return count + routeList[routeIndex].steps.length + 1;
        }, 0);
    };

    /**
     * @description Counts all the checked routes and steps at the specified route indices.
     * @param {...number} routeIndices - The indices of the routes to count.
     * @returns {number} - The total count of checked steps.
     */
    const countAllTheCheckedRoutesAndStepsAt = (...routeIndices) => {
        return routeIndices.reduce((count, routeIndex) => {
            return (
                count +
                routeList[routeIndex].steps.filter((step) => step.isChecked).length
            );
        }, 0);
    };

    /**
     * @description Counts the number of checked steps at the specified indices in a route.
     * @param {number} routeIndex - The index of the route in the route list.
     * @param {...number} stepIndices - The indices of the steps to count.
     * @returns {number} - The number of checked steps.
     */
    const countAllCheckedStepsAt = (routeIndex, ...stepIndices) => {
        return stepIndices.filter(
            (stepIndex) => routeList[routeIndex].steps[stepIndex]?.isChecked
        ).length;
    };

    return [routeList, actions];
}
