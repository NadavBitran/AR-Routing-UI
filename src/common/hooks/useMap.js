import { useState, useCallback, useMemo } from 'react';

/**
 * @template TMap
 * @typedef {Object} StableActions
 * @property {(key: keyof TMap, value: TMap[keyof TMap]) => void} set - Sets a value in the map if it doesn't exist, otherwise updates it.
 * @property {(...entries: [key: keyof TMap, value: TMap[keyof TMap]][]) => void} setManyAt - Sets many values in the map at once if they don't exist, otherwise updates them.
 * @property {(newMap: TMap) => void} setAll - Sets all values in the map.
 * @property {(key: keyof TMap) => void} removeAt - Removes a value from the map.
 * @property {(...keys: (keyof TMap)[]) => void} removeManyAt - Removes many values from the map at once.
 * @property {() => void} clear - Emptys the map.
 * @property {() => void} reset - Resets the map to the initial map.
 */

/**
 * @template TMap
 * @typedef {Object} Actions
 * @property {(key: keyof TMap) => TMap[keyof TMap]} get - Gets a value from the map.
 * @property {(key: keyof TMap, value: TMap[keyof TMap]) => void} set - Sets a value in the map if it doesn't exist, otherwise updates it.
 * @property {(...entries: [key: keyof TMap, value: TMap[keyof TMap]][]) => void} setManyAt - Sets many values in the map at once if they don't exist, otherwise updates them.
 * @property {(newMap: TMap) => void} setAll - Sets all values in the map.
 * @property {(key: keyof TMap) => void} removeAt - Removes a value from the map.
 * @property {(...keys: (keyof TMap)[]) => void} removeManyAt - Removes many values from the map at once.
 * @property {() => void} clear - Emptys the map.
 * @property {() => void} reset - Resets the map to the initial map.
 */

/**
 * Custom hook for managing a map state.
 *
 * @template TValue - The type of the values in the map.
 * @param {Record<string,TValue>} initialMap - The initial map state.
 * @returns {[Record<string,TValue>, Actions<Record<string,TValue>>]} - An array containing the map state and an object with utility functions.
 *
 * @author Nadav Bitran
 */
export default function useMap(initialMap) {
    const [map, setMap] = useState(initialMap);

    /** @type {StableActions<Record<string,TValue>>} */
    const actions = useMemo(
        () => ({
            setManyAt: (...entries) => {
                setMap((prevMap) => {
                    let currentMap = { ...prevMap };
                    entries.forEach(([key, value]) => {
                        currentMap = { [key]: value, ...currentMap };
                    });
                    return currentMap;
                });
            },

            set: (key, value) => {
                setMap((prevMap) => {
                    return { ...prevMap, [key]: value };
                });
            },

            setAll: (entries) => {
                setMap(entries);
            },

            removeManyAt: (...keys) => {
                setMap((prevMap) => {
                    let currentMap = { ...prevMap };
                    keys.forEach((key) => {
                        const { [key]: _, ...updatedMap } = currentMap;
                        currentMap = updatedMap;
                    });
                    return currentMap;
                });
            },

            removeAt: (key) => {
                setMap((prevMap) => {
                    const { [key]: _, ...rest } = prevMap;
                    return rest;
                });
            },

            clear: () => {
                setMap({});
            },

            reset: () => {
                setMap(initialMap);
            },
        }),
        [setMap, initialMap]
    );

    /** @type {Actions<Record<string, TValue>>} */
    const utils = {
        get: useCallback((key) => map[key], [map]),
        ...actions,
    };

    return [map, utils];
}
