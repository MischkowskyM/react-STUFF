export function updateFormState(state) {
	return {
		type: "UPDATE",
		formState: state,
		formValid: Object.keys(state).reduce((a,b) => !state[a].error && !state[b].error)
	};
}

export function setFormField(field){
	return{
		type: "SET_FORM_FIELD",
		field: field
	}
}