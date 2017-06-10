export function updateFormState(state) {

	return {
		type: "UPDATE",
		formState: state,
		formValid: false,
	};
}

export function setFormField(fieldValues,fieldId){
	return{
		type: "SET_FORM_FIELD",
		field: fieldValues,
		fieldId: fieldId
	}
}