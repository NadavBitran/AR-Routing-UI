import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/PopupWindow.css";

// ---- PROPS ----
// title: string that contains the title of the popup window
// mainContent: string that contains the main content of the popup window
// buttonsKey: array of strings that contains the keys of the buttons
// buttonsContent: array of strings that contains the content of the buttons
// setUserDecision: function that changes the value of the userDecision state in the parent component
export default function PopupWindow({ title, mainContent, buttonsKey, buttonsContent, setUserDecision }) {
    // ---- STATE HOOKS ----
    // isOpen: boolean that indicates if the popup window is open or not
    const [isOpen, setIsOpen] = useState(true);

    // ---- FUNCTIONS ----
    // handleButtonClick: function that is called when a button is clicked
    // It changes the value of the userDecision state in the parent component and closes the popup window
    const handleButtonClick = (buttonKey) => {
        setIsOpen(false);
        setUserDecision(buttonKey);
    };

    // ---- COMPONENT RENDER ----
    return ReactDOM.createPortal( // The ReactDOM.createPortal method renders the popup window in the body of the document
        <>
            {isOpen && ( // The popup window is rendered only if isOpen is true
                <div className="popup-overlay"> {/* The popup-overlay is what darkens the background */}
                    <div className="popup-window"> {/* The popup-window is the actual popup window */}
                        <h2 className="popup-window__title">{title}</h2> {/* The title of the popup window */}
                        <p className="popup-window__main-content">{mainContent}</p> {/* The main content of the popup window */}
                        <div className="popup-window__buttons"> {/* The buttons of the popup window */}
                            {buttonsContent.map((content, index) => ( // For each button, a button element is rendered 
                                <button key={buttonsKey[index]} onClick={() => handleButtonClick(buttonsKey[index])}> 
                                    {content}
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
