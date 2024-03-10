import { useState, createContext, useContext } from 'react';
import { ENDPOINT } from '../constants/endpoints';

export function useEndpointLocation() {
    const [currEndpoint, setCurrEndpoint] = useState(ENDPOINT.MAP);

    return [currEndpoint, setCurrEndpoint];
}

export const EndpointLocationContext = createContext(undefined);

export function useEndpointLocationContext() {
    const data = useContext(EndpointLocationContext);

    if (data === undefined) {
        throw new Error('useEndpointLocationContext must be used within a EndpointLocationProvider');
    }

    return data;
}