import { useState, useEffect } from 'react';

import * as DataTypes from '../../../types/data.types';

/**
 * A custom hook which manages the coordinates of a tooltip relative to its target element.
 *
 * @param {number} targetId - The id of the element the tooltip is pointing to. Comes from the `data-tooltip-target-id` attribute.
 * @returns {DataTypes.TooltipCoordinates} The coordinates of the tooltip.
 *
 * @author Nadav Bitran
 */
export default function useTooltipCoordinates(targetId) {
    /** @type {DataTypes.TooltipCoordinates} */
    const initialCoordinates = {
        height: '0px',
        width: '0px',
        middleX: '0px',
        middleY: '0px',
    };
    const [coordinates, setCoordinates] = useState(initialCoordinates);

    useEffect(() => {
        const handleResize = () => {
            const element = document.querySelector(
                `[data-tooltip-target-id="${targetId}"]`
            );
            const { top, left, width, height } =
                element.getBoundingClientRect();
            const middleX = left + width / 2;
            const middleY = top + height / 2;

            setCoordinates({
                height: `${height}px`,
                width: `${width}px`,
                middleX: `${middleX}px`,
                middleY: `${middleY}px`,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [targetId]);

    return coordinates;
}
