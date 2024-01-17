import { createPortal } from 'react-dom';
import { useFlag } from '../../hooks';

import './styles.css';
import questionIcon from '../../assets/question-circle.svg';
import infoIcon from '../../assets/info-circle.svg';
import warningIcon from '../../assets/warning-circle.svg';

import * as DataTypes from '../../types/data.types';

/**
 * Represents a popup window component.
 *
 * @param {object} props - The component props.
 * @param {'question' | 'info' | 'warning'} props.type - The type of the popup window ('question', 'info', 'warning').
 * @param {string} props.title - The title of the popup window.
 * @param {string} props.bodyContent - The content of the popup window body.
 * @param {DataTypes.Image | undefined} props.bodyImage - The image to be displayed in the popup window body. Optional.
 * @param {DataTypes.Button[]} props.buttons - The buttons to be displayed in the popup window.
 * @returns {React.JSX.Element} The rendered popup window component.
 *
 * @author Maor Bezalel
 */
export default function PopupWindow({
    type,
    title,
    bodyContent,
    bodyImage,
    buttons,
}) {
    const { flag: isPopupWindowOpen, disable: closePopupWindow } =
        useFlag(true);

    /**
     * Returns the icon for the popup window.
     *
     * @param {'question' | 'info' | 'warning'} type - The type of the popup window.
     * @returns {DataTypes.Image} The icon for the popup window.
     */
    const popupWindowIcon = (type) => {
        switch (type) {
            case 'question':
                return {
                    src: questionIcon,
                    alt: 'Question mark',
                };
            case 'info':
                return {
                    src: infoIcon,
                    alt: 'Information mark',
                };
            case 'warning':
                return {
                    src: warningIcon,
                    alt: 'Warning mark',
                };
            default:
                return {
                    src: questionIcon,
                    alt: 'Question mark',
                };
        }
    };

    /**
     * Executes the action of the button and closes the popup window.
     *
     * @param {() => void} action - The function to be executed when the button is clicked.
     * @returns {void}
     */
    const handleButtonClick = (action) => {
        action(); // execute the action of the button
        closePopupWindow();
    };

    const { src: iconSrc, alt: iconAlt } = popupWindowIcon(type);
    return createPortal(
        <>
            {isPopupWindowOpen && (
                <div className="popup-overlay">
                    <div className={'popup-window--' + type}>
                        <header className="popup-window__title-bar">
                            <img src={iconSrc} alt={iconAlt} />
                            <h2 className="popup-window__title">{title}</h2>
                        </header>
                        <p className="popup-window__main-content">
                            {bodyContent}
                        </p>
                        {!!bodyImage && (
                            <img src={bodyImage.src} alt={bodyImage.alt} />
                        )}
                        <div className={'popup-window__buttons'}>
                            {buttons.map(({ text, action }, index) => (
                                <button
                                    className={'popup-window__button--' + type}
                                    onClick={() => handleButtonClick(action)}
                                    key={index}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
}
