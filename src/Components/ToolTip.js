import "../styles/ToolTip.css";
import {useState ,useEffect} from 'react';
import ReactDOM from "react-dom";

// ---- PROPS ----
// 1) content -> The content that will be displayed in the toolTip
// 2) position -> The position that the tooltip will be in compare to the element 
// There are 8 possible positions:
// *****************************
// - top
// - topRight
// - topLeft
// - right
// - buttomRight
// - buttom
// - buttomLeft
// - left
// *****************************
// 3) buttonsContent -> The content that will be displayed in the toolTip
// 4) elementClassName -> The *className* of the Element which the toolTip is pointing at
// 5) elementClassNameIndex -> (If the element displays in the form of mapping) its index in the array 
export default function ToolTip({content , position , buttonsContent , elementClassName , elementClassNameIndex }) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE STATES ---- 
    // 1) elementCurrentPosition -> Track the element's current position in the DOM                 
    const [elementCurrentPosition, setElementCurrentPosition] = useState({height: "0px" ,
                                                                          width: "0px" ,
                                                                          middleX: "0px" ,
                                                                          middleY: "0px"})
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // ---- USE EFFECTS ----
    // 1) positioning update UseEffect
    // explanation of the UseEffect:
    // First, the UseEffect does not accept an empty dependency array, which means 
    // that it will work *only* during the first rendering of the toolTip and when it is removed from the screen
    // The function is responsible for taking the current positions of the element, and updating the state accordingly.
    // The block below the function (until the return function) will be activated only once, 
    // therefore the name of the function will be assigned to event and the function will be activated for the first time

    // Element Illustration:
    //
    //      HEIGHT
    //        |
    //        |
    //        /
    // ------------MiddleX-----------
    // |                            |   -------> WIDTH
    // |           ELEMENT        Middle   
    // |            FIELD           Y
    // |                            |
    // ------------------------------      

    useEffect(() => {
        function handleToolTipPosition() { 
            
            const elementField = document.querySelectorAll(`.${elementClassName}`)[
                                    elementClassNameIndex===null? 0 : elementClassNameIndex
                                ];
            const {top , left , width , height} = elementField.getBoundingClientRect();
    
            const middleX = left + (width / 2);
            const middleY = top + (height / 2);
    
            setElementCurrentPosition({
                height: `${height}px`,
                width:  `${width}px`,
                middleX:`${middleX}px`,
                middleY:`${middleY}px`
            });
        }

        window.addEventListener('resize' , handleToolTipPosition)
        
        handleToolTipPosition()

        return () => {
            window.removeEventListener('resize', handleToolTipPosition)
        }// clean-up function -> cleans the event after the toolTip not begin rendering
    } , [elementClassName , elementClassNameIndex])
    // --------------------------------------------------------
    // --------------------------------------------------------

    // --------------------------------------------------------
    // --------------------------------------------------------
    // -- JSX ---
    return ReactDOM.createPortal(
                <div className={`tooltip-content-overlay`}> 
                    <div className={`tooltip-content ${position}`} // Gets the desired position for the tooltip
                         style={{'--tooltip-middleX': elementCurrentPosition.middleX, // Adding the updated positions as css custom properties
                                 '--tooltip-middleY': elementCurrentPosition.middleY,
                                 '--tooltip-width'  : elementCurrentPosition.width,
                                 '--tooltip-height' : elementCurrentPosition.height,}}>
                            <div className="tooltip-text">
                                {content}
                            </div>
                            <div className="tooltip-buttons">
                                {buttonsContent.map((currbuttonContent, index) => (
                                <button key={index}>{currbuttonContent}</button>))}
                            </div>
                    </div> 
                </div>,document.body)
}