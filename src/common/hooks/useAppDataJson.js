import { useState, useEffect } from 'react';
import * as DataTypes from '../types/data.types';

/**
 * A hook which holds both the app data and its json string and provides methods to update them.
 *
 * @param {DataTypes.AppData} initialAppData - The initial value of the app data.
 * @returns {DataTypes.AppDataAndItsJson} the app data with methods to set and update it, and the app data as json string.
 */
export default function useAppDataJson(initialAppData) {
    const [appData, setAppData] = useState(initialAppData);
    const [json, setJson] = useState(JSON.stringify(appData, null, 2));

    /**
     * @param {DataTypes.AppData} newAppData
     */
    const set = (newAppData) => {
        setAppData(newAppData);
    };

    /**
     * @param {DataTypes.LatLngExpression} newLatLng
     */
    const setMapLatLngExpression = (newLatLng) => {
        setAppData({ ...appData, latlng: newLatLng });
    };

    /**
     * @param {DataTypes.Route[]} newRouteList
     */
    const setRouteListOfAppData = (newRouteList) => {
        setAppData({
            ...appData,
            routeList: newRouteList.map((route) => {
                return {
                    name: route.name,
                    steps: route.steps.map((step) => {
                        return {
                            length: step.length,
                            direction: step.direction,
                        };
                    }),
                };
            }),
        });
    };

    useEffect(() => {
        setJson(JSON.stringify(appData, null, 2));
    }, [appData, setAppData]);

    return {
        data: appData,
        json: json,
        set,
        setMapLatLngExpression,
        setRouteListOfAppData,
    };
}
