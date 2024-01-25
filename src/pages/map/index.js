import React from 'react';

import { AppContext } from '../../common/contexts/AppContext';



import { useNavigate } from 'react-router-dom';
import useMarkerLocation from './hooks/useMarkerLocation';
import { useAppContext } from '../../common/hooks';

import Footer from '../../layouts/footer';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapEvent from './components/MapEvent';
import MapSearchBar from './components/MapSearchBar';
import MapTutorialBar from './components/MapTutorialBar';

import {
    MAP_INITIAL_VALUES,
    MAP_PAGE_TEXT,
    MAP_TILES_PROPETIES,
} from './constants/mapConstants';


import './styles.css';
import '../../common/styles/global.css';

/**
 * Represents a Map component.
 * @returns {React.JSX.Element} The Map component.
 */
export default function Map() {
    const {
        markerLocation,
        latestMarkerUpdateOperation,
        updateMarkerLocation,
    } = useMarkerLocation(MAP_INITIAL_VALUES.INITIAL_POSITION);
    const appData = useAppContext();
    const navigate = useNavigate();

    // TEMPOREY FUNCTIONS:
    const continueToRouteManager = () => {
        // update the app context with the marker location
        navigate('/route-manager');
    };
    const startMapTutorial = () => {
        // starting tutorial
    };
    const handleContinueToRouteManager = () => {
        continueToRouteManager();
    };

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

        <Footer buttonText={MAP_PAGE_TEXT.CONTINUE}
                buttonOnClickAction={handleContinueToRouteManager}/>

        </>
    );
}
