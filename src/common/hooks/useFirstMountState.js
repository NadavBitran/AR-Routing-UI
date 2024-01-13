import { useRef } from 'react';

/**
 * A custom hook that returns whether the component is mounted or not.
 *
 * @returns {boolean} Whether the component is mounted or not.
 *
 * @author Maor Bezalel
 */
export default function useFirstMountState() {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
}
