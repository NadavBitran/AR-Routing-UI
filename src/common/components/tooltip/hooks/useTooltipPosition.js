import { useState, useEffect } from 'react';

/**
 * @typedef {`${number}px`} Pixels - A string representing a number of pixels.
 *
 * @typedef {object} TooltipPosition
 * @property {Pixels} height - The height of the element.
 * @property {Pixels} width - The width of the element.
 * @property {Pixels} middleX - The middle X coordinate of the element.
 * @property {Pixels} middleY - The middle Y coordinate of the element.
 */

/**
 * A custom hook which returns the position of the tooltip and adjust to the element it is pointing to (even on window resize event).
 *
 * @param {number} targetId - The id of the element the tooltip is pointing to. Comes from the `data-tooltip-target-id` attribute.
 * @returns {TooltipPosition} The position of the tooltip.
 *
 * @author Nadav Bitran
 */
export default function useTooltipPosition(targetId) {
    /** @type {TooltipPosition} */
    const initialPosition = {
        height: '0px',
        width: '0px',
        middleX: '0px',
        middleY: '0px',
    };
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        const handleResize = () => {
            // const element = document.querySelectorAll(`.${elementClassName}`)[
            //     !elementClassNameIndex ? 0 : elementClassNameIndex
            // ];
            const element = document.querySelector(
                `[data-tooltip-target-id="${targetId}"]`
            );
            const { top, left, width, height } =
                element.getBoundingClientRect();
            const middleX = left + width / 2;
            const middleY = top + height / 2;

            setPosition({
                height: `${height}px`,
                width: `${width}px`,
                middleX: `${middleX}px`,
                middleY: `${middleY}px`,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [targetId]);

    return position;
}
