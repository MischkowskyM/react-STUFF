import React from "react";
import PropTypes from "prop-types";
import {updateFormState,setFormField} from "./redux/formActions";
import { connect } from 'react-redux';

class FieldWrapper extends React.Component {
	static propTypes ={
		formState: PropTypes.object,
		onFormStateChange: PropTypes.func,
	}

	constructor(props) {		
		super(props)
		let defaultState = {};

		React.Children.forEach(this.props.children, (child) => {
			if (typeof(child.type) !== "string" ){
				defaultState[child.props.id] = {};
			}
		});
		this.props.dispatch(updateFormState(defaultState));
		this.update = this.update.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		let isValid = true;
		let newState ={
			...this.props.formState
		}
		Object.keys(this.props.formState).forEach((childId) => {
			let child = this.props.children.find(y => y.props.id === childId);
			let {validate} = child.props;
			if (validate) {
				newState[childId].error = this.validateChild(newState[childId].value, validate);
				isValid = !newState[childId].error;
			}
		});
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
			let child = this.props.children.find(y => y.props.id === childId);
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
		var childrenWithProps = React.Children.map(this.props.children, (child) => {
			if (typeof(child.type) === "string" ){
				return child
			}
			
			return React.cloneElement(
				child,
				{ updateParent: this.update, ...this.props.formState[child.props.id] });
		});
		return (
			<form onSubmit={this.handleSubmit}>
				 { childrenWithProps }
			</form>
		);
	}
}


function mapStateToProps(state){
	return {formState: state.formState};
}
export default connect(mapStateToProps)(FieldWrapper);