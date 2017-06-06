const initialState = {
	formState: {}
}

export default(state = initialState, action) => {
	console.log(action);
    switch (action.type) {
        case "UPDATE":
            return {...state, formState: {...action.formState}};
        case "SET_FORM_FIELD": {
            let newState = {...state};
            newState[action.field.id] = {...action.field};
            return newState;
        }
        default:
            return state;
    }
};