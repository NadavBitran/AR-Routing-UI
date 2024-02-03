import * as HookTypes from '../../../common/types/hooks-related.types';
import * as DataTypes from '../../../common/types/data.types';

import { validationHelpers } from '../../../common/utils/validationHelpers';

/**
 * @typedef {() => boolean} ValidateRouteList
 */
/** 
 * @param {DataTypes.Route[]} routeList  - The route list.
 * @param {HookTypes.RouteListValidationActions} validationActions - The validation actions to perform on the route list.
 
 * @returns {ValidateRouteList}
 */
const useRouteListValidation = (routeList , validationActions) => {
    
    /**
     * @returns {boolean} - True or false if the entire route list is valid or not.
     */
    const validateRouteList = () => {
        const unvalidatedRoutes = routeList.filter((route, routeIndex) => !validateRouteProps(route, routeIndex));
        const unvalidatedSteps = [];

        routeList.forEach((route, routeIndex) => {
            route.steps.forEach((step, stepIndex) => {
                if (!validateStepProps(step, routeIndex, stepIndex)) {
                    unvalidatedSteps.push(step);
                }
            });
        });

        return unvalidatedRoutes.length === 0 && unvalidatedSteps.length === 0;
    };

    /**
     * 
     * @param {DataTypes.Route} route - The route to validate 
     * @param {number} routeIndex - The route's index 
     * @returns {boolean} - True of false if the route is valid or not.
     */
    const validateRouteProps = (route, routeIndex) => {
        let errorMessage = undefined;
        
        if(!validationHelpers.isInputEnglish(route.name)) errorMessage = 'Route name must be in English';
        if(validationHelpers.isInputEmpty(route.name))   errorMessage = 'Route name is required';

        const isRouteValid = errorMessage === undefined;

        validationActions.updateRouteValidationStatusAt(routeIndex, 'isNameValid', isRouteValid , errorMessage);
        !isRouteValid && validationActions.updateRouteExpansionStatusAt(routeIndex, true);
        
        return isRouteValid;
    };

    /**
     * 
     * @param {DataTypes.Step} step - the step to validate 
     * @param {number} routeIndex - The step's route index 
     * @param {number} stepIndex - The route's index  
     * @returns {boolean} - True of false if the step is valid or not.
     */
    const validateStepProps = (step, routeIndex, stepIndex) => {
        let errorMessage = undefined;

        if(!validationHelpers.isInputPositiveNumberLessThan10000(step.length)) errorMessage = 'Step length must be a positive number between 0 and 10,000 meters!';
        
        const isStepValid = errorMessage === undefined;

        validationActions.updateStepValidationStatusAt(routeIndex, stepIndex, 'isLengthValid', isStepValid , errorMessage);
        !isStepValid && validationActions.updateRouteExpansionStatusAt(routeIndex, true);

        return isStepValid;
    };




    return validateRouteList;
};

export default useRouteListValidation;
