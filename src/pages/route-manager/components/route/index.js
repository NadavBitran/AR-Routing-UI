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
    return (
        <>
            <div className="route-manager__full-bar route">
                <Checkbox
                    onButtonClick={() =>
                        actions.updateRoutesCheckStatusAt(
                            !route.isChecked,
                            index
                        )
                    }
                    isChecked={route.isChecked}
                />
                <span className="route__text">
                    <label htmlFor={`route-${index + 1}-name`}>
                        Route #{index + 1}:{' '}
                    </label>
                    <input
                        id={`route-${index + 1}-name`}
                        name={`route #${index + 1} name`}
                        className={`route-input ${route.isValid.isNameValid ? '' : 'route-input--error'}`}
                        type="text"
                        placeholder="e.g. Restroom"
                        pattern="^[a-zA-Z\s]+(?:-[a-zA-Z\s]+)*$"
                        required
                        onChange={(event) =>
                            actions.updateRouteNameAt(index, event.target.value)
                        }
                    />
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
                            actions.updateRouteExpansionStatusAt(
                                index,
                                !route.isExpanded
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
