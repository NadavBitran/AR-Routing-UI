import useMarkerLocation from './hooks/useMarkerLocation';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapEvent from './components/MapEvent';
import MapSearchBar from './components/MapSearchBar';

import { MAP_INITIAL_VALUES, MAP_TILES_PROPETIES } from './constants/mapConstants';

import NavigateBar from '../../common/components/navigate-bar/navigate-bar';

import './styles.css';
import '../../common/styles/global.css';
import { ENDPOINT } from '../../common/constants/endpoints';

import * as DataTypes from '../../common/types/data.types';

/**
 * Represents a Map component.
 *
 * @param {object} props
 * @param {DataTypes.AppDataAndItsJson['setMapLatLngExpression']} props.saveMarkerLocation
 * @returns {React.JSX.Element} The Map component.
 */
export default function Map({ saveMarkerLocation }) {
    const { markerLocation, updateMarkerLocation, latestMarkerUpdateOperation } =
        useMarkerLocation(MAP_INITIAL_VALUES.INITIAL_POSITION);

    const saveAndContinue = () => {
        saveMarkerLocation(markerLocation);
        return true;
    };

    return (
        <>
            <main className={'mapContainer'}>
                <section className={'mapOuter-container'}>
                    <MapSearchBar updateMarkerLocation={updateMarkerLocation} />
                    <MapContainer
                        center={MAP_INITIAL_VALUES.INITIAL_POSITION}
                        zoom={MAP_INITIAL_VALUES.INITIAL_ZOOM}
                        scrollWheelZoom={MAP_INITIAL_VALUES.INITIAL_SCROLL_WHEEL_ZOOM}
                        style={{ flex: '1' }}
                    >
                        <TileLayer
                            attribution={MAP_TILES_PROPETIES.ATTRIBUTION}
                            url={MAP_TILES_PROPETIES.URL}
                        />
                        <Marker position={markerLocation}></Marker>
                        <MapEvent
                            markerLocation={markerLocation}
                            updateMarkerLocation={updateMarkerLocation}
                            latestMarkerUpdateOperation={latestMarkerUpdateOperation}
                        />
                    </MapContainer>
                </section>
            </main>
            <NavigateBar
                text="To manage routes"
                beforeContinuingAction={() => saveAndContinue()}
                toPath={ENDPOINT.ROUTE_MANAGER}
            />
        </>
    );
}
