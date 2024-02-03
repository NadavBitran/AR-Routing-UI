import trashBinPNG from '../../assets/remove-selected-trash-bin.png';

import * as HookTypes from '../../../../common/types/hooks-related.types';

import './styles.css';

/**
 * @typedef {object} ControllerMenuProps
 * @property {HookTypes.ControllerActions} actions - An object containing specific actions for handling the menu action in the route list.
 */

/**
 * Represent a step of a route in the route list.
 *
 * @param {ControllerMenuProps} props - The component props.
 * @returns {React.JSX.Element}
 */
export default function ControllerMenu({actions}) {
    return (
        <section className="section controller-menu">
            <button className="controller-menu__button controller-menu__button--tutorial"> 
                Tutorial
            </button>
            <button className="controller-menu__button controller-menu__button--select-all" onClick={() => actions.checkAllRoutes()}>
                Select All
            </button>
            <button className="controller-menu__button controller-menu__button--remove-selected" onClick={() => actions.removeAllCheckedRoutesAndSteps()}>
                <img src={trashBinPNG} alt="A trash bin icon" />
                <p>Remove Selected</p>
            </button>
        </section>
    );
}
