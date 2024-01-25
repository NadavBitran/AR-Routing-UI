import React from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

import useAutoCompleteSearch from '../hooks/useAutoCompleteSearch';

import * as DataTypes from '../../../common/types/data.types';
import * as HookTypes from '../../../common/types/hooks-related.types';

import SearchIcon from "../../../Assets/images/search-bar-icon.svg";

/**
 * Represents the MapSearchBar component.
 *
 * @param {object} props - The component props.
 * @param {HookTypes.UseMarkerLocationResults['updateMarkerLocation']} props.updateMarkerLocation - The function to update the marker location.
 * @returns {React.JSX.Element} The rendered MapSearchBar component.
 *
 * @author Nadav Bitran
 */
export default function MapSearchBar({ updateMarkerLocation }) {
    const autoCompleteRef = useAutoCompleteSearch(updateMarkerLocation);

    return (
        <>
            <div
                id="autocomplete"
                className="autocomplete-container"
                ref={autoCompleteRef}>

                    
                <img className={"search-icon"} src={SearchIcon}/>
            </div>

        </>
    );
}
