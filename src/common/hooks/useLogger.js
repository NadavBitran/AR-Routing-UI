import useMount from './useMount';
import useUnmount from './useUnmount';
import useUpdateEffect from './useUpdateEffect';

/**
 * A custom hook that logs a component's lifecycle events to the console.
 * This is useful for debugging.
 *
 * @param {string} componentName - The name of the component to log.
 * @param {...any} rest - Any additional arguments to log. (e.g. props, state, etc.)
 * @returns {void}
 *
 * @author Maor Bezalel
 */
export default function useLogger(componentName, ...rest) {
    useMount(() => {
        console.log(`${componentName} mounted`, ...rest);
    });
    useUnmount(() => {
        console.log(`${componentName} unmounted`);
    });
    useUpdateEffect(() => {
        console.log(`${componentName} updated`, ...rest);
    });
}
