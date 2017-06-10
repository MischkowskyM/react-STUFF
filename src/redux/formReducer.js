const initialState = {
	formState: {}
}

export default(state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            return {...state, formState: {...action.formState}};
        case "SET_FORM_FIELD": {
            return {
                ...state,
                formState: {...state.formState, 
                    [action.fieldId] : action.field
                }
            };
        }
        default:
            return state;
    }
};