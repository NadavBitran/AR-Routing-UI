import * as HookTypes from '../../../../common/types/hooks-related.types';

import trashBinPNG from '../../assets/remove-selected-trash-bin.png';
import './styles.css';

/**
 * @typedef {object} ControllerMenuProps
 * @property {HookTypes.ControllerMenuActions} actions - An object containing specific actions for handling the menu action in the route list.
 */

/**
 * Represent a step of a route in the route list.
 *
 * @param {ControllerMenuProps} props - The component props.
 * @returns {React.JSX.Element}
 */
export default function ControllerMenu({ actions }) {
    const handleSelectAll = () => {
        if (actions.areAllRoutesAndStepsChecked()) {
            actions.uncheckAll();
        } else {
            actions.checkAll();
        }
    };

    const handleRemoveSelected = () => {
        if (actions.areAllRoutesAndStepsChecked()) {
            actions.clear();
        } else {
            actions.removeAllCheckedRoutesAndSteps();
        }
    };

    return (
        <section className="section controller-menu">
            <button className="controller-menu__button controller-menu__button--tutorial">
                Tutorial
            </button>
            <button
                className="controller-menu__button controller-menu__button--select-all"
                onClick={() => handleSelectAll()}
            >
                {actions.areAllRoutesAndStepsChecked()
                    ? 'Unselect All'
                    : 'Select All'}
            </button>
            <button
                className="controller-menu__button controller-menu__button--remove-selected"
                onClick={() => handleRemoveSelected()}
            >
                <img src={trashBinPNG} alt="A trash bin icon" />
                <p>Remove Selected</p>
            </button>
        </section>
    );
}
