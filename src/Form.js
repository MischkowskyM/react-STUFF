import React from "react";
import PropTypes from "prop-types";
import {updateFormState,setFormField} from "./redux/formActions";
import { connect } from 'react-redux';

class Form extends React.Component {
	static propTypes ={
		formState: PropTypes.object,
		onFormStateChange: PropTypes.func,
	}

	static childContextTypes = {
		register: PropTypes.func,
		updateForm: PropTypes.func,
		formState: PropTypes.object,
	}


	constructor(props) {		
		super(props)
		let defaultState = {};
		
		this.children = {};

		this.update = this.update.bind(this)
		this.registerChild = this.registerChild.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getChildContext(){
		return {
			register: this.registerChild,
			updateForm : this.update,
			formState: {...this.props.formState },
		}
	}

	registerChild(id, child){
		this.children[id] = child;
	}

	handleSubmit(e){
		e.preventDefault();

		let newState ={
			...this.props.formState
		}

		Object.keys(this.children).forEach((childId) => {
			let child = this.children[childId];
			let {validate} = child.props;
			if (validate) {
				if (!newState[childId]){
					newState[childId] = {value: child.props.value};
				}
				newState[childId].error = this.validateChild(child.props.value, validate);
			}
		});
		this.setState(newState);
		this.props.dispatch(updateFormState(newState))
	}
	
	validateChild(value, validate){
		if (typeof(validate) === "function") {
			return validate(value);
		}
		else
		{
			let error;
			let i = 0;
			while (!error && i < validate.length){
				error = validate[i](value);
				i++
			}
			return error;
		}
	}

	update(childId, value) {
		let childState ={
			value: value,
			error: ""
		}
		
		if (!this.props.formState[childId] || this.props.formState[childId].value !== value){
			let child = this.children[childId];
			if (child.props.validate) {
				childState.error = this.validateChild(childState.value, child.props.validate);
			}
			let newState = {...this.props.formState};
            newState[childId] =childState;
			this.props.dispatch(setFormField(childState, childId));
		}
		return childState.value;
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				 { this.props.children }
			</form>
		);
	}
}


function mapStateToProps(state){
	return {formState: state.formState};
}
export default connect(mapStateToProps)(Form);