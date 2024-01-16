import { useEffect , useRef } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

import {MARKER_UPDATE_OPERATION} from '../constants/mapConstants';

const API_KEY = "8bdca5a571fb4c72b521c19c62bf5e9c";

const useAutoCompleteSearch = (updateMarkerLocation) => {
    const autoCompleteRef = useRef(null)
    const autoCompleteGeocoder = useRef(null)
    
    useEffect(() => {

        createAutoCompleteGeocoderInstance();

        addAutoCompleteEvents();

    } , [autoCompleteRef])

    const createAutoCompleteGeocoderInstance = () => {
        
        if(autoCompleteGeocoder.current) return;

        autoCompleteGeocoder.current = new GeocoderAutocomplete(
            autoCompleteRef.current, 
            API_KEY
        );
    
    }

    const addAutoCompleteEvents = () => {
        autoCompleteGeocoder.current.on("select", (event) => {

            if(!event || !event.geometry || !event.geometry.coordinates) return;

            const coordinatesResult = event.geometry.coordinates;

            updateMarkerLocation(coordinatesResult[1] , coordinatesResult[0] , MARKER_UPDATE_OPERATION.SEARCH);
         
        });
     }
    

    return {autoCompleteRef}
};

export default useAutoCompleteSearch;
