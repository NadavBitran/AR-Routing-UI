import { createContext, useState, useContext } from 'react';

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({});

    return (
        <AppContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </AppContext.Provider>
    );
};
