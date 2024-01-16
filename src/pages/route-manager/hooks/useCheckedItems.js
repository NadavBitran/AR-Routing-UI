import useMap from '../../../common/hooks/useMap';

/**
 * @typedef {object} Actions - An object containing utility functions.
 * @property {(routeId: string) => void} addRoute - Adds the route to the map of checked routes.
 * @property {(routeId: string, stepId: string) => void} addStep - Adds the step to the map of checked steps of the route.
 * @property {(routeId: string) => void} removeRoute - Removes the route from the map of checked routes.
 * @property {(routeId: string, stepId: string) => void} removeStep - Removes the step from the map of checked steps of the route.
 * @property {(...routeIds: string[]) => void} removeManyRoutes - Removes many routes from the map of checked routes.
 * @property {(routeId: string, ...stepIds: string[]) => void} removeManySteps - Removes many steps from the map of checked steps of the route.
 * @property {(routeId: string) => boolean} isRouteChecked - Gets the check state of a route.
 * @property {(routeId: string, stepId: string) => boolean} isStepChecked - Gets the check state of a step.
 * @property {(routeId: string) => void} checkRoute - Checks a route.
 * @property {(routeId: string, stepId: string) => void} checkStep - Checks a step.
 * @property {(routeId: string) => void} checkAllSteps - Checks all steps of a specified route.
 * @property {(routeId: string) => void} uncheckRoute - Unchecks a route.
 * @property {(routeId: string, stepId: string) => void} uncheckStep - Unchecks a step.
 * @property {(routeId: string) => void} uncheckAllSteps - Unchecks all steps of a specified route.
 * @property {(routeId: string) => void} toggleRoute - Toggles a route check state.
 * @property {(routeId: string, stepId: string) => void} toggleStep - Toggles a step check state.
 * @property {() => string[]} getAllSelectedRoutes - Gets all selected routes.
 * @property {() => string[]} getAllSelectedSteps - Gets all selected steps.
 *
 * @typedef {Record<string, [boolean, Record<string, boolean>]>} CheckedItems - A map of route ids to a tuple of a route check state and a map of step ids to step check states.
 */

/**
 * Custom hook for managing checked routes and steps.
 *
 * @param {CheckedItems} initialCheckedItems - The initial checked routes and steps
 * @returns {[CheckedItems, Actions]} - An array containing the checked routes and steps and an object with utility functions.
 *
 * @author Maor Bezalel
 */
export default function useCheckedItems(initialCheckedItems) {
    const [checkedRoutes, checkedRoutesActions] = useMap(initialCheckedItems);

    /** @type {Actions} */
    const actions = {
        addRoute: (routeId) => {
            checkedRoutesActions.set(routeId, [false, {}]);
        },

        addStep: (routeId, stepId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [
                    checkedRoutes[routeId][0],
                    { ...checkedRoutes[routeId][1], [stepId]: false },
                ],
            ]);
        },

        removeRoute: (routeId) => {
            checkedRoutesActions.removeAt(routeId);
        },

        removeStep: (routeId, stepId) => {
            const stepsRecord = checkedRoutes[routeId][1];
            const { [stepId]: _, ...updatedStepsRecord } = stepsRecord;
            checkedRoutesActions.set(routeId, [
                checkedRoutes[routeId][0],
                updatedStepsRecord,
            ]);
        },

        removeManyRoutes: (...routeIds) => {
            checkedRoutesActions.removeManyAt(...routeIds);
        },

        removeManySteps: (routeId, ...stepIds) => {
            let stepsRecord = checkedRoutes[routeId][1];

            stepIds.forEach((stepId) => {
                const { [stepId]: _, ...updatedStepsRecord } = stepsRecord;
                stepsRecord = updatedStepsRecord;
            });

            checkedRoutesActions.set(routeId, [
                checkedRoutes[routeId][0],
                stepsRecord,
            ]);
        },

        isRouteChecked: (routeId) => {
            const route = checkedRoutes[routeId];
            return route && route[0];
        },

        isStepChecked: (routeId, stepId) => {
            const route = checkedRoutes[routeId];
            return route && route[1][stepId];
        },

        checkRoute: (routeId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [true, checkedRoutes[routeId][1]],
            ]);
        },

        checkStep: (routeId, stepId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [
                    checkedRoutes[routeId][0],
                    { ...checkedRoutes[routeId][1], [stepId]: true },
                ],
            ]);
        },

        checkAllSteps: (routeId) => {
            const stepsRecord = checkedRoutes[routeId][1];

            for (const stepId in stepsRecord) {
                stepsRecord[stepId] = true;
            }

            checkedRoutesActions.setManyAt([
                routeId,
                [checkedRoutes[routeId][0], stepsRecord],
            ]);
        },

        uncheckRoute: (routeId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [false, checkedRoutes[routeId][1]],
            ]);
        },

        uncheckStep: (routeId, stepId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [
                    checkedRoutes[routeId][0],
                    { ...checkedRoutes[routeId][1], [stepId]: false },
                ],
            ]);
        },

        uncheckAllSteps: (routeId) => {
            const stepsRecord = checkedRoutes[routeId][1];

            for (const stepId in stepsRecord) {
                stepsRecord[stepId] = false;
            }

            checkedRoutesActions.setManyAt([
                routeId,
                [checkedRoutes[routeId][0], stepsRecord],
            ]);
        },

        toggleRoute: (routeId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [!checkedRoutes[routeId][0], checkedRoutes[routeId][1]],
            ]);
        },

        toggleStep: (routeId, stepId) => {
            checkedRoutesActions.setManyAt([
                routeId,
                [
                    checkedRoutes[routeId][0],
                    {
                        ...checkedRoutes[routeId][1],
                        [stepId]: !checkedRoutes[routeId][1][stepId],
                    },
                ],
            ]);
        },

        getAllSelectedRoutes: () => {
            const routeIds = Object.keys(checkedRoutes);
            return routeIds.filter((routeId) =>
                actions.isRouteChecked(routeId)
            );
        },

        getAllSelectedSteps: () => {
            const routeIds = Object.keys(checkedRoutes);
            let selectedStepsWithRoute = [];
            routeIds.forEach((routeId) => {
                const stepsRecord = checkedRoutes[routeId][1];
                const stepIds = Object.keys(stepsRecord);
                let isChecked = false;
                let checkedSteps = [];
                stepIds.forEach((stepId) => {
                    if (actions.isStepChecked(routeId, stepId)) {
                        isChecked = true;
                        checkedSteps = [...checkedSteps, stepId];
                    }
                });
                if (isChecked)
                    selectedStepsWithRoute = [
                        ...selectedStepsWithRoute,
                        [routeId, checkedSteps],
                    ];
            });
            return selectedStepsWithRoute;
        },
    };

    return [checkedRoutes, actions];
}
// [[route1 , [step1 , step5 , step10]] , [route5, [step3 , step6 , step9]]]
