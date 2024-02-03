const isInputEnglish = (input) => {
    const englishRegex = /^[a-zA-Z]+$/;
    return englishRegex.test(input);
};

const isInputPositiveNumber = (input) => {
    const positiveNumberRegex = /^[1-9]\d*(\.\d{1,2})?$/;
    return positiveNumberRegex.test(input);
};

const isInputPositiveNumberLessThan10000 = (input) => {
    const positiveNumberRegex = /^[1-9]\d*(\.\d{1,2})?$/;
    return positiveNumberRegex.test(input) && Number(input) < 10000;
}; 


const isInputEmpty = (input) => {
    if (input == null) {
        return true;
    }
    if (typeof input === 'string' && input.trim() === '') {
        return true;
    }
    return false;
}

export const validationHelpers = {
    isInputEnglish,
    isInputPositiveNumber,
    isInputPositiveNumberLessThan10000,
    isInputEmpty
}

