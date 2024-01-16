// TODO: create a general hook for handling list items

import { useState, useMemo } from 'react';

/**
 * @template T - The type of the items in the list.
 * @typedef {object} ListActions
 * @property {(newList: T[] | ((prevState: T[]) => T[])) => void} set - Sets new list instead of the old list.
 * @property {(...items: T[]) => void} push - Pushes items to the end of the list.
 * @property {(index: number, item: T) => void} updateAt - Updates the item at the specified index.
 * @property {(index: number, item: T) => void} insertAt - Inserts an item at the specified index.
 * @property {(predicate: (a: T, b: T) => boolean, newItem: T) => void} update - Updates all items that match the predicate.
 * @property {(predicate: (a: T, b: T) => boolean, newItem: T) => void} updateFirst - Updates the first item that matches the predicate.
 * @property {(predicate: (a: T, b: T) => boolean, newItem: T) => void} upsert - Like `updateFirst`, but inserts the item if it doesn't exist.
 * @property {(callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void} filter - Filters the list (like the native `Array.filter`).
 * @property {(index: number) => void} removeAt - Removes the item at the specified index.
 * @property {() => void} clear - Emptys the list.
 * @property {() => void} resetToInitial - Resets the list to the initial list.
 */

/**
 * Custom hook for handling list items.
 *
 * @template T - The type of the items in the list.
 * @param {Array<T>} initialList - The initial list.
 * @returns {[Array<T>, ListActions<T>]} - The list and the list actions.
 *
 * @author Maor Bezalel
 */
export default function useList(initialList) {
    const [list, setList] = useState(initialList);

    /** @type {ListActions<T>} */
    const actions = useMemo(() => {
        return {
            set: (newList) => {
                setList(newList);
            },

            push: (...items) => {
                actions.set((prevList) => [...prevList, ...items]);
            },

            updateAt: (index, item) => {
                actions.set((prevList) => {
                    const newList = [...prevList];
                    newList[index] = item;
                    return newList;
                });
            },

            insertAt: (index, item) => {
                actions.set((prevList) => {
                    const newList = [...prevList];
                    newList.splice(index, 0, item);
                    return newList;
                });
            },

            update: (predicate, newItem) => {
                actions.set((prevList) => {
                    const newList = prevList.map((item) => {
                        const shouldUpdate = predicate(item, newItem);
                        return shouldUpdate ? newItem : item;
                    });
                    return newList;
                });
            },

            updateFirst: (predicate, newItem) => {
                const index = list.findIndex((item) =>
                    predicate(item, newItem)
                );
                const doesItemExist = index >= 0;

                if (doesItemExist) {
                    actions.updateAt(index, newItem);
                }
            },

            upsert: (predicate, newItem) => {
                const index = list.findIndex((item) =>
                    predicate(item, newItem)
                );
                const doesItemExist = index >= 0;

                if (doesItemExist) {
                    actions.updateAt(index, newItem);
                } else {
                    actions.push(newItem);
                }
            },

            filter: (callbackFn, thisArg) => {
                actions.set((prevList) => prevList.filter(callbackFn, thisArg));
            },

            removeAt: (index) => {
                actions.set((prevList) => {
                    const newList = [...prevList];
                    newList.splice(index, 1);
                    return newList;
                });
            },

            clear: () => {
                actions.set([]);
            },

            resetToInitial: () => {
                actions.set(initialList);
            },
        };
    }, []);

    return [list, actions];
}
