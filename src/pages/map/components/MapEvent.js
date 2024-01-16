import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';

import { MARKER_UPDATE_OPERATION } from '../constants/mapConstants';

/**
 * @typedef {import("../../../common/types").LatLngExpression} LatLngExpression
 * @typedef {(latlng: LatLngExpression, updatedFrom: string) => void} UpdateLatLngExpression
 */

/**
 * Represents a component for handling map events.
 * @param {object} props - The component props.
 * @param {LatLngExpression} props.markerLocation - The location of the marker on the map.
 * @param {string} props.latestMarkerUpdateOperation - The latest operation that updated the marker location.
 * @param {UpdateLatLngExpression} props.updateMarkerLocation - A function to update the location of the marker on the map.
 * @returns {null} - Returns null.
 */
export default function MapEvent({
    markerLocation,
    latestMarkerUpdateOperation,
    updateMarkerLocation,
}) {
    const map = useMapEvents({
        click(e) {
            updateMarkerLocation(e.latlng, MARKER_UPDATE_OPERATION.CLICK);
        },
        locationfound(e) {
            updateMarkerLocation(
                e.latlng,
                MARKER_UPDATE_OPERATION.USER_LOCATION
            );
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (!map) {
            return;
        }

        map.locate();
    }, [map]);

    useEffect(() => {
        if (latestMarkerUpdateOperation === MARKER_UPDATE_OPERATION.SEARCH) {
            map.flyTo(markerLocation, map.getZoom());
        }
    }, [markerLocation, latestMarkerUpdateOperation, map]);

    return null;
}
