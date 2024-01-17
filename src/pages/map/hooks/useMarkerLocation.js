import { useState } from 'react';

import * as DataTypes from '../../../common/types/data.types';
import * as HookTypes from '../../../common/types/hooks-related.types';

/**
 * Custom hook that manages the location of a marker on the map.
 * @param {DataTypes.LatLngExpression} initialPosition - The initial position of the marker.
 * @returns {HookTypes.UseMarkerLocationResults} The marker location hook.
 */
const useMarkerLocation = (initialPosition) => {
    const [markerLocation, setMarkerLocation] = useState(initialPosition);
    const [latestMarkerUpdateOperation, setLatestMarketUpdateOperation] =
        useState(null);

    /**
     * Updates the location of the marker on the map.
     *
     * @param {DataTypes.LatLngExpression} latlng - The new latitude and longitude of the marker.
     * @param {string} updatedFrom - The source of the update. // TODO: make this an enum
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
