import { useEffect, useRef } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

import { MARKER_UPDATE_OPERATION } from '../constants/mapConstants';

import * as DataTypes from '../../../common/types/data.types';
import * as HookTypes from '../../../common/types/hooks-related.types';

const API_KEY = '8bdca5a571fb4c72b521c19c62bf5e9c';

/**
 * Custom hook for handling auto-complete search functionality.
 * @param {HookTypes.UseMarkerLocationResults['updateMarkerLocation']} updateMarkerLocation - Function to update the marker location.
 * @returns {React.MutableRefObject<any>} - Object containing the autoCompleteRef.
 *
 * @author Nadav Bitran
 */
export default function useAutoCompleteSearch(updateMarkerLocation) {
    const autoCompleteRef = useRef(null);
    const autoCompleteGeocoder = useRef(null);

    useEffect(() => {
        createAutoCompleteGeocoderInstance();
        addAutoCompleteEvents();
    }, [autoCompleteRef]);

    const createAutoCompleteGeocoderInstance = () => {
        if (autoCompleteGeocoder.current) return;

        autoCompleteGeocoder.current = new GeocoderAutocomplete(
            autoCompleteRef.current,
            API_KEY
        );
    };

    const addAutoCompleteEvents = () => {
        autoCompleteGeocoder.current.on('select', (event) => {
            if (!event || !event.geometry || !event.geometry.coordinates)
                return;

            /**@type {DataTypes.LatLngExpression}*/
            const coordinatesResult = {
                lat: event.geometry.coordinates[1],
                lng: event.geometry.coordinates[0],
            };

            updateMarkerLocation(
                coordinatesResult,
                MARKER_UPDATE_OPERATION.SEARCH
            );
        });
    };

    return autoCompleteRef;
}
