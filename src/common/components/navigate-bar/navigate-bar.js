import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks';

import * as DataTypes from '../../types/data.types';

import './styles.css';
import '../../styles/color.css';
import { ENDPOINT } from '../../constants/endpoints';

/**
 * NavigateBar component.
 *
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {() => boolean} [props.beforeContinuingAction] - The action to be executed before continuing to the next page, will continue only if the action returns true.
 * @param {string} [props.toPath] - The next endpoint to navigate.
 * @returns {JSX.Element} The rendered NavigateBar component.
 */
export default function NavigateBar({ text, beforeContinuingAction , toPath }) {
    const navigator = useNavigate();

    // Right now we don't know where to navigate from '/route-manager'.
    const navigateTo = () => {
        if(!toPath) toPath = ENDPOINT.ROUTE_MANAGER;
        if(!beforeContinuingAction || beforeContinuingAction()){
            navigator(toPath);
        }
    }

    return (
        <div className={'navigate__bar'}>
            <div className={'container navigate--button--container'}>
                <button className={'navigate--btn'}
                        onClick={() => navigateTo()}>
                    {text}
                </button>
            </div>
        </div>
    );
}
