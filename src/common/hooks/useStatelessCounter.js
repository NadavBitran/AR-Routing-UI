import { useRef } from 'react';

/**
 * @typedef {object} UseStatelessCounterResults
 * @property {number} count - The current count.
 * @property {(by?: number) => void} countUp - A function for increasing the count by a given amount. Default is 1.
 * @property {(by?: number) => void} countDown - A function for decreasing the count by a given amount. Default is 1.
 * @property {(newCount?: number) => void} setCountTo - A function for setting the count to a new value. Default is 0 (reseting the count).
 */

/**
 * Custom hook for managing a stateless counter (i.e., a counter that does not re-render the component when its value changes, but still persist its value between renders).
 *
 * @param {number} [initialCount=0] - The initial value of the counter. Default is 0.
 * @returns {UseStatelessCounterResults} An object containing the current count and utility functions for managing the counter.
 */
export default function useStatelessCounter(initialCount = 0) {
    const countRef = useRef(initialCount);

    const countUp = (by = 1) => {
        countRef.current += by;
    };

    const countDown = (by = 1) => {
        countRef.current -= by;
    };

    const setCountTo = (newCount = 0) => {
        countRef.current = newCount;
    };

    return {
        count: countRef.current,
        countUp,
        countDown,
        setCountTo,
    };
}
