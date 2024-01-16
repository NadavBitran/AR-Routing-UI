import React from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

import useAutoCompleteSearch from '../hooks/useAutoCompleteSearch';

/**
 * @typedef {import("../../../common/types").LatLngExpression} LatLngExpression
 * @typedef {(latlng: LatLngExpression, updatedFrom: string) => void} UpdateLatLngExpression
 */

/**
 * Represents the MapSearchBar component.
 * @param {object} props - The component props.
 * @param {UpdateLatLngExpression} props.updateMarkerLocation - The function to update the marker location.
 * @returns {JSX.Element} The rendered MapSearchBar component.
 *
 * @author Nadav Bitran
 */
export default function MapSearchBar({ updateMarkerLocation }) {
    const autoCompleteRef = useAutoCompleteSearch(updateMarkerLocation);

    return (
        <div
            id="autocomplete"
            className="autocomplete-container"
            ref={autoCompleteRef}
        ></div>
    );
}
