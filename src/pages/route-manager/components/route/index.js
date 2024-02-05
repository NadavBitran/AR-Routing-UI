import useRouteValidityStatus from '../../hooks/useRouteValidityStatus';

import Checkbox from '../../../../common/components/checkbox';

import trashBinPNG from '../../assets/remove-selected-trash-bin.png';
import expandArrowActiveSVG from '../../assets/expand-arrow-active.svg';
import expandArrowInactiveSVG from '../../assets/expand-arrow-inactive.svg';

import * as DataTypes from '../../../../common/types/data.types';
import * as HookTypes from '../../../../common/types/hooks-related.types';

import './styles.css';

/**
 * @typedef {object} RouteProps
 * @property {DataTypes.Route} route - The route.
 * @property {number} index - The route's index.
 * @property {HookTypes.RouteActions} actions - An object containing specific actions for handling a route in the route list.
 * @property {React.ReactNode} children - The route's children.
 *
 */

/**
 * Represent a route in the route list.
 *
 * @param {RouteProps} props - The component props.
 * @returns {React.JSX.Element}
 *
 * @author Maor Bezalel
 */
export default function Route({ route, index, actions, children }) {
    const {
        routeRef,
        routeValidityStatus: { isRouteValid, errorMessage },
    } = useRouteValidityStatus();

    /**
     * @description Takes the value of the name input upon change and calls an action to update the route's name.
     * @param {string} newName - The new name of the route.
     */
    const handleNameInputChange = (newName) => {
        actions.updateRouteNameAt(index, newName);
    };

    return (
        <>
            <div className="route-manager__full-bar route" id={`route-${index + 1}`}>
                <Checkbox
                    onButtonClick={() =>
                        actions.updateRoutesCheckStatusAt(!route.isChecked, index)
                    }
                    isChecked={route.isChecked}
                />
                <span className="route__text">
                    <label htmlFor={`route-${index + 1}-name`}>
                        Route #{index + 1}:{' '}
                    </label>
                    <input
                        id={`route-${index + 1}-name`}
                        name={`route name`}
                        className={`route-input ${route.isDirty && !isRouteValid ? 'route-input--error' : ''}`}
                        type="text"
                        placeholder="e.g. Restroom"
                        pattern="^[a-zA-Z\s]+(?:-[a-zA-Z\s]+)*$"
                        required
                        onChange={({ target: { value } }) =>
                            handleNameInputChange(value)
                        }
                        onBlur={() => actions.markRouteAsDirtyAt(index)}
                        ref={routeRef}
                    />
                    <span
                        className="route-input__error-message"
                        style={{
                            visibility:
                                route.isDirty && !isRouteValid
                                    ? 'visible'
                                    : 'hidden',
                        }}
                    >
                        {errorMessage}
                    </span>
                </span>
                <menu className="route__menu">
                    <button
                        className="route__menu-button"
                        onClick={() => actions.removeRoutesAt(index)}
                    >
                        <img
                            className="route__menu-button-icon"
                            src={trashBinPNG}
                            alt="delete"
                        />
                    </button>
                    <button
                        className="route__menu-button"
                        disabled={route.steps.length === 0}
                        onClick={() =>
                            actions.updateRoutesExpansionStatusAt(
                                !route.isExpanded,
                                index
                            )
                        }
                    >
                        <img
                            className={`route__menu-button-icon ${route.steps.length > 0 && route.isExpanded ? 'route__menu-button-icon--active' : ''}`}
                            src={
                                route.steps.length > 0
                                    ? expandArrowActiveSVG
                                    : expandArrowInactiveSVG
                            }
                            alt="expand"
                        />
                    </button>
                </menu>
            </div>
            {children}
        </>
    );
}
