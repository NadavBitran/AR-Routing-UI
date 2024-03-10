
import { useEndpointLocationContext } from '../../hooks';

import './styles.css';
import '../../styles/color.css';

/**
 * NavigateBar component.
 *
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {() => boolean} [props.beforeContinuingAction] - The action to be executed before continuing to the next page, will continue only if the action returns true.
 * @param {string} [props.toPath] - The next endpoint to navigate.
 * @returns {React.JSX.Element} The rendered NavigateBar component.
 */
export default function NavigateBar({ text, beforeContinuingAction, toPath }) {
    const {setCurrEndpoint} = useEndpointLocationContext();

    const navigateTo = () => {
        if (!beforeContinuingAction || beforeContinuingAction()) {
            setCurrEndpoint(toPath);
        }
    };

    return (
        <div className={'navigate__bar'}>
            <div className={'container navigate--button--container'}>
                <button className={'navigate--btn'} onClick={() => navigateTo()}>
                    {text}
                </button>
            </div>
        </div>
    );
}
