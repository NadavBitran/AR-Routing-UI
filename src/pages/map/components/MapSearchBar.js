import React from 'react';
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import useAutoCompleteSearch from '../hooks/useAutoCompleteSearch';

const MapSearchBar = ({ updateMarkerLocation }) => {
    
    const {autoCompleteRef } = useAutoCompleteSearch(updateMarkerLocation);


  return (
        <div id="autocomplete" className="autocomplete-container" ref={autoCompleteRef}></div>
  );
};

export default MapSearchBar;
