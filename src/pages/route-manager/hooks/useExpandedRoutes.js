import useMap from '../../../common/hooks/useMap';

/**
 * @typedef {object} Actions - An object containing utility functions.
 * @property {(routeId: string) => void} add - Adds the route to the map of expanded routes.
 * @property {(routeId: string) => void} remove - Removes the route to the map of expanded routes.
 * @property {(routeId: string) => boolean} isExpanded - Gets the expansion state of a route.
 * @property {(routeId: string) => void} expand - Expands a route.
 * @property {(routeId: string) => void} collapse - Collapses a route.
 * @property {(routeId: string) => void} toggle - Toggles a route expansion state.
 * @property {() => void} clear - Empty the map of expanded routes.
 */

/**
 * Custom hook that manages the state of expanded routes.
 *
 * @param {Record<string,boolean>} initialExpandedRoutes - The initial expanded routes.
 * @return {[Record<string,boolean>, Actions]} - An array containing the expanded routes and an object with utility functions.
 */
export default function useExpandedRoutes(initialExpandedRoutes) {
    const [expandedRoutes, expandedRoutesActions] = useMap(
        initialExpandedRoutes
    );

    /**@type {Actions} */
    const actions = {
        add: (routeId) => {
            expandedRoutesActions.set(routeId, true);
        },

        remove: (routeId) => {
            expandedRoutesActions.removeAt(routeId);
        },

        isExpanded: (routeId) => {
            return expandedRoutes[routeId];
        },

        expand: (routeId) => {
            if (!expandedRoutes[routeId]) return;
            expandedRoutesActions.set(routeId, true);
        },

        collapse: (routeId) => {
            if (!expandedRoutes[routeId]) return;
            expandedRoutesActions.set(routeId, false);
        },

        toggle: (routeId) => {
            if (!expandedRoutes[routeId]) return;
            expandedRoutesActions.set(routeId, !expandedRoutes[routeId]);
        },

        clear: () => {
            expandedRoutesActions.setAll({});
        },
    };

    return [expandedRoutes, actions];
}
