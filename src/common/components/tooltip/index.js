import { createPortal } from 'react-dom';
import useTooltipPosition from './hooks/useTooltipPosition';

import './tooltip.css';

/**
 * @typedef {'top' | 'topRight' | 'topLeft' | 'right' | 'buttomRight' | 'buttom' | 'buttomLeft' | 'left'} TooltipPositionRelativeToTarget
 */

/**
 * Renders a tooltip component.
 *
 * @param {object} props - The props for the Tooltip component.
 * @param {TooltipPositionRelativeToTarget}  props.positionRelativeToTarget - The position that the tooltip will be relative to the target element.
 * @param {number} props.targetId - The ID of the target element. Must be unique!
 * @param {string} props.targetContent - The content to be displayed in the tooltip.
 * @param {() => void | undefined} props.signalToDisplayNextTooltip - A function to signal the display of the next tooltip. if undefined, then that means that this is the last tooltip in the sequence.
 * @param {() => void} props.signalToEndTooltipsSequence - A function to signal the end of the tooltips sequence.
 * @returns {JSX.Element} The rendered Tooltip component. Appears as a portal on top of the `body` element.
 *
 * @author Nadav Bitran
 */
export default function Tooltip({
    positionRelativeToTarget,
    targetId,
    targetContent,
    signalToDisplayNextTooltip,
    signalToEndTooltipsSequence,
}) {
    const position = useTooltipPosition(targetId);

    return createPortal(
        <div className="tooltip-content-overlay">
            <div
                className={`tooltip-content ${positionRelativeToTarget}`} // Gets the desired position for the tooltip
                style={{
                    // Adding the updated positions as css custom properties
                    '--tooltip-middleX': position.middleX,
                    '--tooltip-middleY': position.middleY,
                    '--tooltip-width': position.width,
                    '--tooltip-height': position.height,
                }}
            >
                <div className="tooltip-text">{targetContent}</div>
                <div className="tooltip-buttons">
                    <button onClick={() => signalToEndTooltipsSequence()}>
                        Exit
                    </button>
                    {!signalToDisplayNextTooltip && (
                        <button onClick={() => signalToDisplayNextTooltip()}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
