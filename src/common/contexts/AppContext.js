import { createContext } from 'react';
import useAppData from '../hooks/useAppData';

import { MAP_INITIAL_VALUES } from '../../pages/map/constants/mapConstants';

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
    
    const [appData , setAppData] = useAppData({routeList: [],latlng: MAP_INITIAL_VALUES.INITIAL_POSITION});


    return (
        <AppContext.Provider value={{ appData , setAppData}}>
            {children}
        </AppContext.Provider>
    );
};
