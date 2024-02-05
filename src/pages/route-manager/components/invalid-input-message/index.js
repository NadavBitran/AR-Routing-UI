import './styles.css';

/**
 * @typedef {object} InvalidInputMessageProps
 * @property {'route' | 'step'} forWho - The target element for the invalid input message (route or step).
 * @property {boolean} isVisible - Determines whether to reveal the invalid input message to the user or not.
 * @property {string} message - The text message to be displayed to the user, containing the invalidation reason.
 */

/**
 * Renders an invalid input message component for either a route or a step.
 *
 * @param {InvalidInputMessageProps} props
 * @returns {React.JSX.Element} The invalid input message component.
 */
export default function InvalidInputMessage({ forWho, isVisible, message }) {
    return (
        <span
            className={`${forWho}-invalid-input-message`}
            style={{
                visibility: isVisible ? 'visible' : 'hidden',
            }}
        >
            {message}
        </span>
    );
}
