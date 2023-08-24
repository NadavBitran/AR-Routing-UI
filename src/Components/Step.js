import "../styles/Step.css";

import PopupWindow from "./PopupWindow";

import { useState, useEffect } from "react";

export default function Step(props) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE STATES ----

    // userDecision:
    //              If "Yes, I'm Sure" -> The user confirm that he indeed wants to remove the selected routes/steps
    //              If "No, I'm Not Sure" -> The user doesn't want to remove the selected routes/steps
    const [userDecision, setUserDecision] = useState(null);

    // routeIndexToRemove: The index of the route that the user wants to remove
    const [routeIndexToRemove, setRouteIndexToRemove] = useState(-1);

    // stepIndexToRemove: The index of the step that the user wants to remove
    const [stepIndexToRemove, setStepIndexToRemove] = useState(-1);

    // warningMessageJSX: The JSX of the warning message that will be displayed to the user when he tries to remove a route/step
    const [warningMessageJSX, setWarningMessageJSX] = useState(null);

    // lastValidKeyPressedInLengthInput: The last valid key that the user pressed in the length input. used mainly to prevent the user from entering two dots at the same time.
    const [lastValidKeyPressedInLengthInput, setLastValidKeyPressedInLengthInput] = useState(null);

    // lengthInputErrorMessage: The error message that will be displayed to the user if the length input is invalid
    const [lengthInputErrorMessage, setLengthInputErrorMessage] = useState('');

    // erroSuffixCSS: The CSS class that will be added to the error message suffix if user entered an invalid character in the length input
    const [errorSuffixCSS, setErrorSuffixCSS] = useState('');

    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- HANDLERS ----

    // DESCRIPTION: Enters the updated route checked value with the appropriate index that inside the route with the appropriate index, and updates the state accordingly 
    const handleStepCheck = (event) => {
        props.updateCheckedStep(event.target.checked, props.stepIndex, props.routeIndex)
    }

    // DESCRIPTION: Enters the length of the step in the step's route accordingly
    const handleLengthInput = (event) => {
        console.log(event.target.value);
        props.addLengthToStep(event.target.value, props.stepIndex, props.routeIndex);
    }

    const handleLengthInputOnKeyDown = (event) => {
        if (!isKeyPressedInLengthInputValid(event.target.value, event.key)) {
            setErrorSuffixCSS('error'); // add the error CSS class to the error message suffix to make the input outline red
            event.preventDefault(); // prevent the user from entering the invalid character (the character will not be displayed in the input)
        }
        else {
            setLastValidKeyPressedInLengthInput(event.key); // save the last valid key that the user pressed in the length input
            setErrorSuffixCSS(''); // remove the error CSS class from the error message suffix to make the input outline black
        }
    }

    // DESCRIPTION: Enters the direction of the step in the step's route accordingly
    const handleDirectionInput = (event) => {
        props.addDirectionToStep(event.target.value, props.stepIndex, props.routeIndex);
    }

    // DESCRIPTION: Removes the step from the step's route accordingly
    const handleRemoveStep = () => {
        if (warningMessageJSX === null) { // if the warning message is not displayed to the user, display it
            setRouteIndexToRemove(props.routeIndex); // save the index of the route which contain the step that the user wants to remove
            setStepIndexToRemove(props.stepIndex); // save the index of the step that the user wants to remove
            setWarningMessageJSX( // display a warning message to the user, asking him to confirm the removal of the selected steps
                <PopupWindow
                    type={"warning"}
                    title={"Warning: Confirm Removal"}
                    mainContent={"Are you sure you want to remove this step? This action cannot be undone."}
                    buttonsKey={['yes', 'cancel']}
                    buttonsContent={["Yes, I'm Sure.", "Cancel"]}
                    setUserDecision={setUserDecision} />
            );
        } else {
            props.removeStep(props.stepIndex, props.routeIndex);
            setUserDecision(null);
            setWarningMessageJSX(null);
            setRouteIndexToRemove(-1);
            setStepIndexToRemove(-1);
        }
    }
    // --------------------------------------------------------
    // -------------------------------------------------------- 

    // --------------------------------------------------------
    // -------------------------------------------------------- 
    // ---- VALIDATION FUNCTIONS ----

    // DESCRIPTION: Checks if the key that the user pressed in the length input is valid
    const isKeyPressedInLengthInputValid = (lengthValue, currKeyPressed) => {
        if (isEnglishLetter(currKeyPressed) || isHebrewLetter(currKeyPressed) || isSymbolButNotDot(currKeyPressed)) {
            setLengthInputErrorMessage("Only numbers are allowed!");
            return false;
        }

        if (currKeyPressed === '-') {
            setLengthInputErrorMessage(`${lengthValue === '' ? 'Negative numbers are not allowed!' : 'Only numbers are allowed!'} `);
            return false;
        }

        if (currKeyPressed === '.') {
            if (lengthValue === '') {
                setLengthInputErrorMessage('Only numbers are allowed!');
                return false;
            }
            if (lengthValue.includes('.')) {
                setLengthInputErrorMessage('Only one decimal point is allowed!');
                return false;
            }
            setLengthInputErrorMessage('');
            return true;
        }
        
        if (isDigit(currKeyPressed)) {
            if (currKeyPressed === '0') {
                if (lengthValue === '') {
                    setLengthInputErrorMessage('Zero cannot be the first digit of a number!');
                    return true; // we still want to allow the user to enter the "0" key, since it can be the first digit of a decimal number
                }
                if (lengthValue > 0) {
                    setLengthInputErrorMessage('');
    
                    return true;
                }
                setLengthInputErrorMessage('Zero cannot be the first digit of a number!');
                return false;
            }

            if (lengthValue.at(0) === '0' && lengthValue.at(1) !== '.') {
                setLengthInputErrorMessage('Zero cannot be the first digit of a number!');
                return false;
            }
            setLengthInputErrorMessage('');
            return true;
        }

        if (currKeyPressed === '0') {
            if (lengthValue === '') {
                setLengthInputErrorMessage('Zero cannot be the first digit of a number!');
                return true; // we still want to allow the user to enter the "0" key, since it can be the first digit of a decimal number
            }
            setLengthInputErrorMessage('');
            return true;
        }

        setLengthInputErrorMessage(''); // if the user pressed a valid key, remove the error message
        return true;
    }

    // DESCRIPTION: Checks if the given character is an English letter
    function isEnglishLetter(char) {
        return /^[A-Za-z]$/.test(char);
    }

    // DESCRIPTION: Checks if the given character is a Hebrew letter
    function isHebrewLetter(char) {
        return /^[\u0590-\u05FF]$/.test(char);
    }

    // DESCRIPTION: Checks if the given character is a digit
    function isDigit(char) {
        // Use a regular expression to check for digits (0-9)
        return /^[0-9]$/.test(char);
    }

    // DESCRIPTION: Checks if the given character is a symbol, but not a dot
    function isSymbolButNotDot(char) {
        // Use a regular expression to check for symbols
        return /[!@#$%^&*()_+{}\[\]:;<>,?~\\/\-=|"'`]/g.test(char);
    }
    // --------------------------------------------------------
    // -------------------------------------------------------- 

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- POP-UP WINDOW INPUT PROCESS ----

    // DESCRIPTION: handles the user's decision regarding the removal of the selected routes
    useEffect(() => {
        switch (userDecision) {
            case 'yes':
                handleRemoveStep();
                break;
            case 'cancel':
                setUserDecision(null);
                setWarningMessageJSX(null);
                setRouteIndexToRemove(-1);
                setStepIndexToRemove(-1);
                break;
            default:
                break;
        }
    }, [userDecision, routeIndexToRemove, stepIndexToRemove]);

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <>
            <div className="step">
                <input type="checkbox" className="step__checkbox" onChange={handleStepCheck} checked={props.stepElement.isChecked} />
                <h3 className="step__index">Step #{props.stepIndex + 1}</h3>
                <div className="step__content">
                    <div className="step__length">
                        <section className="step__length-input">
                            <h3>Length: </h3>
                            <input 
                                className={errorSuffixCSS} 
                                type="text" 
                                maxLength={6} 
                                onKeyDown={handleLengthInputOnKeyDown} 
                                onChange={handleLengthInput} 
                                placeholder={"Length in meters..."} 
                                value={props.stepElement.length}></input>
                        </section>
                        <p className="step__length-error">{lengthInputErrorMessage}</p>
                    </div>
                    <div className="step__direction">
                        <h3>Direction: </h3>
                        <select onChange={handleDirectionInput} value={props.stepElement.direction}>
                            <option value="none" hidden>Choose Direction</option>
                            <option>Foward</option>
                            <option>Foward-Left</option>
                            <option>Left</option>
                            <option>Left-Backwards</option>
                            <option>Backwards</option>
                            <option>Right-Backwards</option>
                            <option>Right</option>
                            <option>Foward-Right</option>
                        </select>
                    </div>
                </div>
                <button className="step__button--remove" onClick={handleRemoveStep}>Remove Step</button>
            </div>
            {warningMessageJSX}
        </>
    );
}