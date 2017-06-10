export function updateFormState(state) {
	return {
		type: "UPDATE",
		formState: state,
		formValid: !Object.keys(state).find(key => state[key].error),
	};
}

export function setFormField(fieldValues,fieldId){
	return{
		type: "SET_FORM_FIELD",
		field: fieldValues,
		fieldId: fieldId
	}
}