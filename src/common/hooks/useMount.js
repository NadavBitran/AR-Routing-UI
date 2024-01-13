import { useEffect } from 'react';

/**
 * A custom hook that runs the provided callback function once when the component is mounted.
 *
 * @param {() => void} callback - The callback function to run once when the component is mounted.
 * @returns {void}
 *
 * @author Maor Bezalel
 */
export default function useMount(callback) {
    useEffect(() => {
        callback();
    }, []);
}
