import { Children } from 'react';

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
    const childrenCount = Children.count(children);

    return (
        <>
            <div className="route-manager__full-bar route">
                <Checkbox />
                <span className="route__text">
                    <label htmlFor="route-1-name">Route #{index}: </label>
                    <input
                        id={`route-${index}-name`}
                        name={`route #${index} name`}
                        type="text"
                        placeholder="e.g. Restroom"
                        required
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
                        onClick={() =>
                            actions.updateRouteExpansionStatusAt(
                                index,
                                !route.isExpanded
                            )
                        }
                    >
                        <img
                            className="route__menu-button-icon"
                            src={
                                childrenCount > 0
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
