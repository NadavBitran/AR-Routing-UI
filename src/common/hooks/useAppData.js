import { useState } from 'react';

import * as DataTypes from "../types/data.types";

/**
 * 
 * @param {DataTypes.AppData} initialAppData - The initial app data
 * @returns - The app data and the function to set the app data
 */
const useAppData = (initialAppData) => {
    
    const [appData , setAppData] = useState(initialAppData);


    return [appData , setAppData];
};

export default useAppData;