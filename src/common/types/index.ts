import { LatLngExpression as LeafletLatLangExpression } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';

/** @description represents a latitude and longitude coordinate pair */
export type LatLngExpression = LeafletLatLangExpression;

/** @description the type of the function that sets state returned by React's `useState` hook */
export type SetState<S> = Dispatch<SetStateAction<S>>;

export type MapObject<T> = { [key: string | number | symbol]: T };
