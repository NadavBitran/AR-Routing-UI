import { useState, useMemo } from 'react';

import * as Types from '../types/hooks-related.types';

/**
 * Custom hook for handling list items.
 *
 * @template TItem - The type of the items in the list.
 * @param {Array<TItem>} [initialList=[]] - The initial list.
 * @returns {[Array<TItem>, Types.ListActions<TItem>]} - a tuple containing the list and an object with utility functions for handling the list.
 *
 * @author Maor Bezalel & Nadav Bitran
 */
export default function useList(initialList) {
    const [list, setList] = useState(initialList);

    /** @type {Types.ListActions<TItem>}*/
    const actions = useMemo(() => {
        return {
            set: (newList) => {
                setList(newList);
            },

            add: (...items) => {
                setList((prevList) => [...prevList, ...items]);
            },
            addAt: (index, item) => {
                setList((prevList) => {
                    const newList = [...prevList];
                    newList.splice(index, 0, item);
                    return newList;
                });
            },

            updateAt: (newItem, ...indices) => {
                setList((prevList) => {
                    const newList = [...prevList];
                    indices.forEach((index) => {
                        newList[index] = newItem;
                    });
                    return newList;
                });
            },
            updatePropAt: (prop, newValue, ...indices) => {
                setList((prevList) => {
                    const newList = [...prevList];
                    indices.forEach((index) => {
                        newList[index][prop] = newValue;
                    });
                    return newList;
                });
            },

            removeAt: (...indices) => {
                setList((prevList) => {
                    const newList = prevList.filter(
                        (_, index) => !indices.includes(index)
                    );
                    return newList;
                });
            },

            clear: () => {
                setList([]);
            },
        };
    }, []);

    return [list, actions];
}
