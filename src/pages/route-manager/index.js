import useRouteList from './hooks/useRouteList';
import useRouteListValidation from './hooks/useRouteListValidation';

import ControllerMenu from './components/controller-menu';
import AddButton from './components/add-button';

import Route from './components/route';
import Step from './components/step';

import NavigateBar from '../../common/components/navigate-bar/navigate-bar';

import { ENDPOINT } from '../../common/constants/endpoints';
import { useAppContext } from '../../common/hooks';


import * as HookTypes from '../../common/types/hooks-related.types';

import './styles.css';

export default function RouteManager() {

    const [routeList, routeListActions] = useRouteList([]);
    const appOptions = useAppContext();

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

    /** @type {HookTypes.ControllerActions} */
    const controllerMenuActions = {
        checkAllRoutes: routeListActions.checkAllRoutes,
        removeAllCheckedRoutesAndSteps: routeListActions.removeAllCheckedRoutesAndSteps
     }

    /** @type {HookTypes.RouteListValidationActions} */
    const routeListValidationActions = {
        updateRouteValidationStatusAt: routeListActions.updateRouteValidationStatusAt,
        updateStepValidationStatusAt: routeListActions.updateStepValidationStatusAt,
        updateRouteExpansionStatusAt: routeListActions.updateRouteExpansionStatusAt,
    }

    const validateRouteList = useRouteListValidation(routeList , routeListValidationActions);

    const saveAndContinue = () => {
        if(!validateRouteList()) return false;
        else{
            appOptions.setAppData({...appOptions.appData , routeList : routeList});
            return true;
        }
    }


    return (
        <>
            <main className="container route-manager">
                <ControllerMenu actions={controllerMenuActions}/>
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
            <NavigateBar text="To next phase" beforeContinuingAction={() => saveAndContinue()}/>
        </>
    );
}
