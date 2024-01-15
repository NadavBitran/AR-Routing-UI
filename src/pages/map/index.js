import React from 'react';

import { AppContext } from '../../common/contexts/AppContext';
import useAppContext from '../../common/hooks/useAppContext';

import '../../styles/Map.css';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import MapEvent from './components/MapEvent';
import useMarkerLocation from './hooks/useMarkerLocation';

/**
 * Represents a Map component.
 * @returns {React.JSX.Element} The Map component.
 */
export default function Map() {
    const INITIAL_POSITION = { lat: 31.4117257, lng: 35.08181559 };
    const [markerLocation, updateMarkerLocation] =
        useMarkerLocation(INITIAL_POSITION);

    const value = useAppContext();

    return (
        <MapContainer
            center={INITIAL_POSITION}
            zoom={12}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerLocation}></Marker>
            <MapEvent updateMarkerLocation={updateMarkerLocation} />
        </MapContainer>
    );
}
