import { useEffect } from 'react';

/**
 * A custom hook that runs the provided callback function once when the component is unmounted.
 *
 * @param {() => void} callback - The callback function to run once when the component is unmounted.
 * @returns {void}
 *
 * @author Maor Bezalel
 */
export default function useUnmount(callback) {
    useEffect(() => {
        return callback;
    }, []);
}
