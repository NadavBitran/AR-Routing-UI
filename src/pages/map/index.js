import React, { useCallback } from 'react';

import { useEffect } from 'react';
import { AppContext } from '../../common/contexts/AppContext';

import useMarkerLocation from './hooks/useMarkerLocation';
import { useAppContext } from '../../common/hooks';


import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapEvent from './components/MapEvent';
import MapSearchBar from './components/MapSearchBar';
import MapTutorialBar from './components/MapTutorialBar';


import {
    MAP_INITIAL_VALUES,
    MAP_TILES_PROPETIES,
} from './constants/mapConstants';

import NavigateBar from '../../common/components/navigate-bar/navigate-bar';

import './styles.css';
import '../../common/styles/global.css';
import { ENDPOINT } from '../../common/constants/endpoints';


/**
 * Represents a Map component.
 * @returns {React.JSX.Element} The Map component.
 */
export default function Map() {

    const {markerLocation , updateMarkerLocation , latestMarkerUpdateOperation} = useMarkerLocation(MAP_INITIAL_VALUES.INITIAL_POSITION);

    const appOptions = useAppContext();

    const saveAndContinue = useCallback(() => {
        appOptions.setAppData({...appOptions.appData , latlng : markerLocation});
        return true;
    } , []);


    return (
        <>
            <main className={'mapContainer'}>
                <MapTutorialBar />

                <section className={'mapOuter-container'}>
                    <MapSearchBar updateMarkerLocation={updateMarkerLocation} />
                    <MapContainer
                        center={MAP_INITIAL_VALUES.INITIAL_POSITION}
                        zoom={MAP_INITIAL_VALUES.INITIAL_ZOOM}
                        scrollWheelZoom={
                            MAP_INITIAL_VALUES.INITIAL_SCROLL_WHEEL_ZOOM
                        }
                    >
                        <TileLayer
                            attribution={MAP_TILES_PROPETIES.ATTRIBUTION}
                            url={MAP_TILES_PROPETIES.URL}
                        />
                        <Marker position={markerLocation}></Marker>
                        <MapEvent
                            markerLocation={markerLocation}
                            updateMarkerLocation={updateMarkerLocation}
                            latestMarkerUpdateOperation={
                                latestMarkerUpdateOperation
                            }
                        />
                    </MapContainer>
                </section>
            </main>
            <NavigateBar text="To manage routes" beforeContinuingAction={() => saveAndContinue()} toPath={ENDPOINT.ROUTE_MANAGER}/>
        </>
    );
}
