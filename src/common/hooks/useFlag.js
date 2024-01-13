import { useState, useCallback } from 'react';

/**
 * @typedef {object} UseFlagResults
 * @property {boolean} flag - The flag value.
 * @property {() => void} enable - A function that sets the flag to true.
 * @property {() => void} disable - A function that sets the flag to false.
 * @property {() => void} toggle - A function that toggles the flag.
 */

/**
 * A custom hook that returns a boolean flag and methods to manipulate it.
 *
 * @param {boolean} [initialValue=false] - The initial value of the flag. Defaults to false.
 * @returns {UseFlagResults} An object containing the flag value and functions to manipulate it.
 */
export default function useFlag(initialValue = false) {
    const [flag, setFlag] = useState(initialValue);

    const enable = useCallback(() => setFlag(true), []);
    const disable = useCallback(() => setFlag(false), []);
    const toggle = useCallback(() => setFlag((prev) => !prev), []);

    return { flag, enable, disable, toggle };
}
