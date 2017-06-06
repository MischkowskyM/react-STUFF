import React from "react";
import PropTypes from "prop-types";
import {updateFormState} from "./redux/formActions";
import { connect } from 'react-redux';
import {FIELD_PROPS} from "./shared/FieldProps";

class FieldHOC extends React.Component{
	static propTypes = {
		...FIELD_PROPS
	}

	render(){
		return (
			<div>
				<label htmlFor={this.props.id}>
					{this.props.label}               
				</label>
				{React.createElement(this.props.children[0], {...this.props}) }
				
			</div>
		)
	}
}


class FieldWrapper extends React.Component {
	static propTypes ={
		formState: PropTypes.object,
		defaults: PropTypes.object,
		onFormStateChange: PropTypes.func,
	}

	constructor(props) {		
		super(props)

		let defaultState = {};
		Object.keys(this.props.defaults).forEach((element) => {
			defaultState[element] = {value: this.props.defaults[element]}
		});
		this.props.dispatch(updateFormState(defaultState))
		this.update = this.update.bind(this)
	}

	validateChild(value, validate){
		if (typeof(validate) === "function") {
			return validate(value);
		}
		else
		{
			let error = "";
			for (let i = 0; i < validate.length; i++){
				error = validate[i](value);
				if (error){
					return error;
				}
			}
		}
	}

	update(childId, value) {
		let childState ={
			value: value,
			error: ""
		}
		console.log(this.props.formState);
		if (this.props.formState[childId].value !== value){
			
			let child = this.props.children.find(y => y.props.id === childId);
			
			let {validate} = child.props;
			if (validate) {
				childState.error = this.validateChild(childState.value, validate);
			}
			
			let newState ={
				...this.props.formState,
				[childId]: childState,
				
			};
			Object.keys(newState).reduce((a,b) => !newState[a].error && !newState[b].error)
			this.props.dispatch(updateFormState(newState))
			if (this.props.onFormStateChange){
				this.props.onFormStateChange();
			}
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
			<div>
				{childrenWithProps}
			</div>
		);
	}
}


function mapStateToProps(state){
	console.log("state:", state);
	return {formState: state.formState};
}
export default connect(mapStateToProps)(FieldWrapper);