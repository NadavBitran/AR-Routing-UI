import { useState } from 'react';

/**
 * @typedef {import("leaflet").LatLngExpression} LatLngExpression
 * @typedef {import("../../../common/types").SetState<LatLngExpression>} UpdateLatLngExpression
 */

/**
 * Custom hook that manages the location of a marker on the map.
 * @param {LatLngExpression} initialPosition - The initial position of the marker.
 * @returns {[LatLngExpression, UpdateLatLngExpression]} An object containing the marker's current position and a function to update it.
 */
const useMarkerLocation = (initialPosition) => {
    const [markerLocation, updateMarkerLocation] = useState(initialPosition);

    return [markerLocation, updateMarkerLocation];
};

export default useMarkerLocation;
