import plusSignSVG from '../../assets/plus.svg';
import * as DataTypes from '../../../../common/types/data.types';

import './styles.css';

/**
 * A button that adds a route or step to the route list.
 *
 * @param {object} props - The component props.
 * @param {"route" | "step"} props.add - The type of item to add.
 * @param {DataTypes.Button['action']} props.action - The action to perform when the button is clicked.
 * @returns {React.JSX.Element}
 */
export default function AddButton({ add, action }) {
    return (
        <button
            className={`route-manager__${add === 'route' ? 'full' : 'half'}-bar add-button add-button--${add}`}
            onClick={() => action()}
        >
            <img
                className="add-button__icon"
                src={plusSignSVG}
                alt="plus sign"
            />
            <p className="add-button__text">{`Add ${add === 'route' ? 'New Route' : 'Step'}`}</p>
        </button>
    );
}
