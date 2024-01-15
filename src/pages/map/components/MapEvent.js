import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';

/**
 * @typedef {import("../../../common/types").LatLngExpression} LatLngExpression
 * @typedef {import("../../../common/types").SetState<LatLngExpression>} UpdateLatLngExpression
 */

/**
 * Represents a component for handling map events.
 * @param {object} props - The component props.
 * @param {UpdateLatLngExpression} props.updateMarkerLocation - A function that updates the marker's location.
 * @returns {null} - Returns null.
 */
export default function MapEvent({ updateMarkerLocation }) {
    const map = useMapEvents({
        click(e) {
            updateMarkerLocation(e.latlng);
        },
        locationfound(e) {
            updateMarkerLocation(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (!map) {
            return;
        }

        map.locate();
    }, [map]);

    return null;
}
