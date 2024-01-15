import { useEffect } from 'react';
import useFirstMountState from './useFirstMountState';

/**
 * A custom hook that runs the provided callback function on every update except the first one.
 * This is useful for running side-effects that should not run on the first render.
 *
 * @param {import("react").EffectCallback} effect - The callback function to run on every update except the first one.
 * @param {import("react").DependencyList} [deps] - An array of dependencies for the effect. If one of the dependencies has changed, the effect will run again.
 * @returns {void}
 *
 * @author Maor Bezalel
 */
export default function useUpdateEffect(effect, deps) {
    const isFirstMount = useFirstMountState();

    useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
}
