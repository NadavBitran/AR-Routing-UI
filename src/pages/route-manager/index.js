import useRouteList from './hooks/useRouteList';

import ControllerMenu from './components/controller-menu';
import AddButton from './components/add-button';

import Route from './components/route';
import Step from './components/step';

import * as HookTypes from '../../common/types/hooks-related.types';

import './styles.css';

export default function RouteManager() {
    const [routeList, routeListActions] = useRouteList([]);

    /** @type {HookTypes.RouteActions} */
    const routeActions = {
        updateRouteNameAt: routeListActions.updateRouteNameAt,
        updateRoutesCheckStatusAt: routeListActions.updateRoutesCheckStatusAt,
        updateRouteExpansionStatusAt:
            routeListActions.updateRouteExpansionStatusAt,
        removeRoutesAt: routeListActions.removeRoutesAt,
    };

    /** @type {HookTypes.StepActions} */
    const stepListActions = {
        updateStepLengthAt: routeListActions.updateStepLengthAt,
        updateStepDirectionAt: routeListActions.updateStepDirectionAt,
        updateStepsCheckStatusAt: routeListActions.updateStepsCheckStatusAt,
        removeStepsFromRouteAt: routeListActions.removeStepsFromRouteAt,
    };

    return (
        <main className="container route-manager">
            <ControllerMenu />
            <section className="route-manager__routes">
                <ul className="route-manager__route-list">
                    {routeList.map((route, routeIndex) => (
                        <li
                            className="route-manager__route-item"
                            key={route.id}
                        >
                            <Route
                                route={route}
                                index={routeIndex}
                                actions={routeActions}
                            >
                                <ul>
                                    {route.isExpanded &&
                                        route.steps.map((step, stepIndex) => (
                                            <li key={step.id}>
                                                <Step
                                                    step={step}
                                                    stepIndex={stepIndex}
                                                    routeIndex={routeIndex}
                                                    actions={stepListActions}
                                                />
                                            </li>
                                        ))}
                                </ul>
                                <AddButton
                                    add="step"
                                    action={() => {
                                        routeListActions.addStepsToRouteAt(
                                            routeIndex,
                                            1
                                        );
                                        routeListActions.updateRouteExpansionStatusAt(
                                            routeIndex,
                                            true
                                        );
                                    }}
                                />
                            </Route>
                        </li>
                    ))}
                </ul>
                <AddButton
                    add="route"
                    action={() => routeListActions.addRoutes(1)}
                />
            </section>
        </main>
    );
}
