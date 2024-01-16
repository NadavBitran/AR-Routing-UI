import { useState } from 'react';

/**
 * @typedef {import("leaflet").LatLngExpression} LatLngExpression
 * @typedef {(latlng: LatLngExpression, updatedFrom: string) => void} UpdateLatLngExpression
 * @typedef {{markerLocation: LatLngExpression, latestMarkerUpdateOperation: string, updateMarkerLocation: UpdateLatLngExpression}} UseMarkerLocationResults
 */

/**
 * Custom hook that manages the location of a marker on the map.
 * @param {LatLngExpression} initialPosition - The initial position of the marker.
 * @returns {UseMarkerLocationResults} The marker location hook. TODO: improve docs!!!!
 */
const useMarkerLocation = (initialPosition) => {
    const [markerLocation, setMarkerLocation] = useState(initialPosition);
    const [latestMarkerUpdateOperation, setLatestMarketUpdateOperation] =
        useState(null);

    /**
     * Updates the location of the marker on the map.
     *
     * @param {LatLngExpression} latlng - The new latitude and longitude of the marker.
     * @param {string} updatedFrom - The source of the update. // TODO: make this an enum
     * @returns {void}
     */
    const updateMarkerLocation = (latlng, updatedFrom) => {
        setMarkerLocation(latlng);
        setLatestMarketUpdateOperation(updatedFrom);
    };

    return {
        markerLocation,
        latestMarkerUpdateOperation,
        updateMarkerLocation,
    };
};

export default useMarkerLocation;
