import useRouteList from './hooks/useRouteList';
import useIsRouteListValid from './hooks/useIsRouteListValid';

import ControllerMenu from './components/controller-menu';
import AddButton from './components/add-button';

import Route from './components/route';
import Step from './components/step';

import NavigateBar from '../../common/components/navigate-bar/navigate-bar';

import { ENDPOINT } from '../../common/constants/endpoints';

import * as DataTypes from '../../common/types/data.types';
import * as HookTypes from '../../common/types/hooks-related.types';

import './styles.css';

/**
 * Represents the RouteManager component.
 * @param {object} props
 * @param {DataTypes.AppDataAndItsJson['setRouteListOfAppData']} props.saveRouteList
 * @returns {React.JSX.Element} The RouteManager component.
 */
export default function RouteManager({ saveRouteList }) {
    const [routeList, routeListActions] = useRouteList([]);

    /** @type {HookTypes.RouteActions} */
    const routeActions = {
        updateRouteNameAt: routeListActions.updateRouteNameAt,
        updateRoutesCheckStatusAt: routeListActions.updateRoutesCheckStatusAt,
        updateRoutesExpansionStatusAt: routeListActions.updateRoutesExpansionStatusAt,
        markRouteAsDirtyAt: routeListActions.markRouteAsDirtyAt,
        removeRoutesAt: routeListActions.removeRoutesAt,
    };

    /** @type {HookTypes.StepActions} */
    const stepListActions = {
        updateStepLengthAt: routeListActions.updateStepLengthAt,
        updateStepDirectionAt: routeListActions.updateStepDirectionAt,
        updateStepsCheckStatusAt: routeListActions.updateStepsCheckStatusAt,
        markStepAsDirtyAt: routeListActions.markStepAsDirtyAt,
        removeStepsFromRouteAt: routeListActions.removeStepsFromRouteAt,
    };

    /** @type {HookTypes.ControllerMenuActions} */
    const controllerMenuActions = {
        checkAll: routeListActions.checkAll,
        uncheckAll: routeListActions.uncheckAll,
        removeAllCheckedRoutesAndSteps: routeListActions.removeAllCheckedRoutesAndSteps,
        areAllRoutesAndStepsChecked: routeListActions.areAllRoutesAndStepsChecked,
        clear: routeListActions.clear,
    };

    /** @type {HookTypes.IsRouteListValidActions} */
    const isRouteListValidActions = {
        updateRoutesExpansionStatusAt: routeListActions.updateRoutesExpansionStatusAt,
        markAllAsDirty: routeListActions.markAllAsDirty,
    };

    const { routeListRef: routeListRefForValidation, isRouteListValid } =
        useIsRouteListValid(isRouteListValidActions);

    const saveAndContinue = () => {
        if (!isRouteListValid()) {
            return false;
        }
        saveRouteList(routeList);
        return true;
    };

    return (
        <>
            <main className="container route-manager">
                <ControllerMenu actions={controllerMenuActions} />
                <section className="route-manager__routes">
                    <ul className="route-manager__route-list" ref={routeListRefForValidation}>
                        {routeList.map((route, routeIndex) => (
                            <li className="route-manager__route-item" key={route.id}>
                                <Route route={route} index={routeIndex} actions={routeActions}>
                                    <ul
                                        style={{
                                            display: route.isExpanded ? 'block' : 'none',
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
                                        action={() =>
                                            routeListActions.addStepsToRouteAt(routeIndex, 1)
                                        }
                                    />
                                </Route>
                            </li>
                        ))}
                    </ul>
                    <AddButton add="route" action={() => routeListActions.addRoutes(1)} />
                </section>
            </main>
            <NavigateBar
                text="To next phase"
                beforeContinuingAction={() => saveAndContinue()}
                toPath={ENDPOINT.JSON_RESULT}
            />
        </>
    );
}
