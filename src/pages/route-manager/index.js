import useRouteList from './hooks/useRouteList';
import useRouteListValidation from './hooks/useRouteListValidation';
import useIsRouteListValid from './hooks/useIsRouteListValid';

import ControllerMenu from './components/controller-menu';
import AddButton from './components/add-button';

import Route from './components/route';
import Step from './components/step';

import NavigateBar from '../../common/components/navigate-bar/navigate-bar';

import { ENDPOINT } from '../../common/constants/endpoints';
import { useAppContext } from '../../common/hooks';
import { useCallback, useRef } from 'react';

import * as HookTypes from '../../common/types/hooks-related.types';

import './styles.css';

export default function RouteManager() {
    const [routeList, routeListActions] = useRouteList([]);
    const appOptions = useAppContext();
    const routeListRef = useRef(null);

    /** @type {HookTypes.RouteActions} */
    const routeActions = {
        updateRouteNameAt: routeListActions.updateRouteNameAt,
        updateRoutesCheckStatusAt: routeListActions.updateRoutesCheckStatusAt,
        updateRouteExpansionStatusAt: routeListActions.updateRouteExpansionStatusAt,
        removeRoutesAt: routeListActions.removeRoutesAt,
    };

    /** @type {HookTypes.StepActions} */
    const stepListActions = {
        updateStepLengthAt: routeListActions.updateStepLengthAt,
        updateStepDirectionAt: routeListActions.updateStepDirectionAt,
        updateStepsCheckStatusAt: routeListActions.updateStepsCheckStatusAt,
        removeStepsFromRouteAt: routeListActions.removeStepsFromRouteAt,
        makeStepDirty: routeListActions.makeStepDirty,
    };

    /** @type {HookTypes.ControllerActions} */
    const controllerMenuActions = {
        checkAllRoutes: routeListActions.checkAllRoutes,
        removeAllCheckedRoutesAndSteps:
            routeListActions.removeAllCheckedRoutesAndSteps,
    };

    /** @type {HookTypes.RouteListValidationActions} */
    const routeListValidationActions = {
        updateRouteValidationStatusAt:
            routeListActions.updateRouteValidationStatusAt,
        updateStepValidationStatusAt: routeListActions.updateStepValidationStatusAt,
        updateRouteExpansionStatusAt: routeListActions.updateRouteExpansionStatusAt,
    };

    /** @type {HookTypes.IsRouteListValidActions} */
    const isRouteListValidActions = {
        updateRouteExpansionStatusAt: routeListActions.updateRouteExpansionStatusAt,
        makeStepDirty: routeListActions.makeStepDirty,
    };

    const validateRouteList = useRouteListValidation(
        routeList,
        routeListValidationActions
    );

    const { routeListRef: routeListRefForValidation, isRouteListValid } =
        useIsRouteListValid(isRouteListValidActions);

    const saveAndContinue = useCallback(() => {
        if (!isRouteListValid()) return false;
        else {
            appOptions.setAppData({
                ...appOptions.appData,
                routeList: routeList,
            });
            return true;
        }
    }, [appOptions, routeList]);

    return (
        <>
            <main className="container route-manager">
                <ControllerMenu actions={controllerMenuActions} />
                <section className="route-manager__routes">
                    <ul
                        className="route-manager__route-list"
                        ref={routeListRefForValidation}
                    >
                        {routeList.map((route, routeIndex) => (
                            <li className="route-manager__route-item" key={route.id}>
                                <Route
                                    route={route}
                                    index={routeIndex}
                                    actions={routeActions}
                                >
                                    <ul
                                        style={{
                                            display: route.isExpanded
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        {route.steps.map((step, stepIndex) => (
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
            <NavigateBar
                text="To next phase"
                beforeContinuingAction={() => saveAndContinue()}
            />
        </>
    );
}
