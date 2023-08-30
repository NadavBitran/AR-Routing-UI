import PopupWindow from "./PopupWindow";
import RouteEditor from "./RouteEditor";
import ToolTip from './ToolTip';


import direction_tutorial from "../Assets/images/direction_tutorial.png";

import { useState, useEffect } from 'react';


// ---- PROPS ----
// 1 setTutorialMode -> callback to the state that will take the user out of tutorial mode as soon as he finishes or clicks 'skip' 
export default function RouteTutorial({ setCurrentMode }) {

    // --------------------------------------------------------
    // --------------------------------------------------------    
    // ---- USE STATES: ----
    // tutorialProgress: Represents the user's progress in the tutorial window 
    const [tutorialProgress, setTutorialProgress] = useState(0)

    // userDecision: Represents the user's decisions when clicking on the buttons inside the tooltips
    const [userDecision, setUserDecision] = useState(false)
    // --------------------------------------------------------
    // --------------------------------------------------------

    useEffect(() => {
        switch (userDecision) {
            case "Next":
                setTutorialProgress(currTutorialProgress => currTutorialProgress + 1)
                break;
            case "Exit":
                setCurrentMode('normal')
                break;
            default:
                break;
        }

        setUserDecision(false)

    }, [userDecision, setCurrentMode])

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- CUSTOM GENERATED DATA ----
    // script_route_list: An array with custom information that will be shown to the user during the tutorial
    const script_route_list = [
        {
            routeName: "Cash Register",
            isChecked: false,
            isExpanded: true,
            isNameInputValid: true,
            nameInputErrorMessage: '',
            stepList: [{ 
                length: 100, 
                direction: "Foward", 
                isChecked: false,
                isLengthInputValid: true,
                isDirectionInputValid: true,
                lengthInputErrorMessage: '',
                directionInputErrorMessage: ''
            }, { 
                length: 200, 
                direction: "Left", 
                isChecked: false,
                isLengthInputValid: true,
                isDirectionInputValid: true,
                lengthInputErrorMessage: '',
                directionInputErrorMessage: ''
            }]
        },
        {
            routeName: "Bathroom",
            isChecked: false,
            isExpanded: true,
            isNameInputValid: true,
            nameInputErrorMessage: '',
            stepList: [{ 
                length: 50.5, 
                direction: "Backwards", 
                isChecked: false,
                isLengthInputValid: true,
                isDirectionInputValid: true,
                lengthInputErrorMessage: '',
                directionInputErrorMessage: ''
            }, { 
                length: 10, 
                direction: "Foward-Left", 
                isChecked: false,
                isLengthInputValid: true,
                isDirectionInputValid: true,
                lengthInputErrorMessage: '',
                directionInputErrorMessage: ''
            }]
        }
    ]

    // script_tooltipJSX: An array composed with the JSX of the tooltip and containing the scripts that will be displayed in the tutorial, 
    // as well as with additional information about the location of the tooltip on the screen, and the element linked to it.
    const script_tutorialJSX = [
        <PopupWindow
            type={"info"}
            title={"Tutorial"}
            mainContent={"The foward direction will be the opposite of the direction the avatar is facing!"}
            buttonsKey={["Exit", "Next"]}
            buttonsContent={["Exit", "Next"]}
            setUserDecision={setUserDecision}
            imageDetails={{ image: direction_tutorial, alt: "Direction_Tutorial" }}
        />,
        <ToolTip
            content={"Here you can add routes and start managing them!"}
            position={"buttomRight"}
            buttonsContent={["Exit", "Next"]}
            elementClassName={"route-editor__button--add"}
            elementClassNameIndex={null}
            setUserDecision={setUserDecision} />,
        <ToolTip
            content={"Here you can add steps to your desired routes!"}
            position={"left"}
            buttonsContent={["Exit", "Next"]}
            elementClassName={"route__button--add-step"}
            elementClassNameIndex={0}
            setUserDecision={setUserDecision} />,
        <ToolTip
            content={"If you regret , Don't forget to remove the steps!"}
            position={"topLeft"}
            buttonsContent={["Exit", "Next"]}
            elementClassName={"step__button--remove"}
            elementClassNameIndex={0}
            setUserDecision={setUserDecision} />,
        <ToolTip
            content={"Here you can add length to your steps, each length should be in meters!"}
            position={"top"}
            buttonsContent={["Exit", "Next"]}
            elementClassName={"step__length input"}
            elementClassNameIndex={0}
            setUserDecision={setUserDecision} />,
        <ToolTip
            content={"You can also edit your step's direction by choosing one of 8 possible directions"}
            position={"top"}
            buttonsContent={["Exit", "Next"]}
            elementClassName={"step__direction select"}
            elementClassNameIndex={0}
            setUserDecision={setUserDecision} />,
        <ToolTip
            content={"Click here when you are done, to save your changes and continue on!"}
            position={"top"}
            buttonsContent={["Exit"]}
            elementClassName={"route-manager__button--continue"}
            elementClassNameIndex={null}
            setUserDecision={setUserDecision}
        />
    ]
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- JSX ----
    return (
        <>
            <RouteEditor
                routesList={script_route_list}
                setRoutesList={null} />

            {script_tutorialJSX[tutorialProgress]}
        </>
    );
    // --------------------------------------------------------
    // --------------------------------------------------------
}

