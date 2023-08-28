import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/PopupWindow.css";
import questionSVG from "../Assets/images/question-circle.svg";
import infoSVG from "../Assets/images/info-circle.svg";
import warningSVG from "../Assets/images/warning-circle.svg";


// ---- PROPS ----
// type: string that contains the type of the popup window
// title: string that contains the title of the popup window
// mainContent: string that contains the main content of the popup window
// buttonsKey: array of strings that contains the keys of the buttons
// buttonsContent: array of strings that contains the content of the buttons
// setUserDecision: function that changes the value of the userDecision state in the parent component
// imageDetails: a object that contains ref to image and alt text
export default function PopupWindow({type, title, mainContent, buttonsKey, buttonsContent, setUserDecision , imageDetails = null }) {
    // ---- STATE HOOKS ----
    // isOpen: boolean that indicates if the popup window is open or not
    const [isOpen, setIsOpen] = useState(true);

    // ---- VARIABLES ----
    const popupWindowIcons = {
        "question": questionSVG,
        "info": infoSVG,
        "warning": warningSVG
    };
    const popupWindowIconAlts = {
        "question": "Question mark",
        "info": "Information mark",
        "warning": "Warning mark"
    }

    const popupWindowType = Object.keys(popupWindowIcons).includes(type) ? type : "question";
    const popupWindowIcon = Object.keys(popupWindowIcons).includes(type) ? popupWindowIcons[type] : popupWindowIcons["question"];
    const popupWindowIconAlt = Object.keys(popupWindowIconAlts).includes(type) ? popupWindowIconAlts[type] : popupWindowIconAlts["question"];

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
                    <div className={"popup-window--" + popupWindowType}> {/* The popup-window is the actual popup window */}
                        <header className="popup-window__title-bar">
                            <img src={popupWindowIcon} alt={popupWindowIconAlt} />
                            <h2 className="popup-window__title">{title}</h2> {/* The title of the popup window */}
                        </header>
                        <p className="popup-window__main-content">{mainContent}</p> {/* The main content of the popup window */}
                        {imageDetails!==null && <img src={imageDetails.image} alt={imageDetails.alt}/>}
                        <div className={"popup-window__buttons"}> {/* The buttons of the popup window */}
                            {buttonsContent.map((content, index) => ( // For each button, a button element is rendered 
                                <button className={"popup-window__button--" + type} 
                                        key={buttonsKey[index]} 
                                        onClick={() => handleButtonClick(buttonsKey[index])}> 
                                    {content}
                                </button>
                            ))}
                        </div> 
                    </div>
                </div>
            )}
        </>,
        document.body // The popup window is rendered in the body of the document
    );
}
