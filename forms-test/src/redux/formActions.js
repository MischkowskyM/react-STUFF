export function updateFormState(state) {
	return {
		type: "UPDATE",
		formState: state
	};
}

export function setFormField(field){
	return{
		type: "SET_FORM_FIELD",
		field: field
	}
}