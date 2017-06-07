import React from "react";
import PropTypes from "prop-types";
import {FIELD_PROPS} from "./FieldProps";
import Field from "./Field";

export default class NormalizedField extends React.Component{
        static propTypes = {
        ...FIELD_PROPS,
        normalize: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.array
        ]),
        label: PropTypes.string
    };

    constructor(props){
        super(props);
        this.normalizeChild = this.normalizeChild.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

	normalizeChild(value){
		let normalizedValue = value;
        let {normalize} = this.props;
		if (typeof(normalize) === "function") {
			normalizedValue = normalize(value);
		}
		else
		{
			for (let i = 0; i < normalize.length; i++){
				normalizedValue = normalize[i](normalizedValue);
			}
		}
		return normalizedValue;
	}

    handleUpdate(id, value){
        return this.props.updateParent(id, this.normalizeChild(value));
    }

    render() {
		return (
            <Field
             	id={this.props.id}
                value={this.props.value}
                validate={this.props.validate}
                error={this.props.error}
                label={this.props.label}
                updateParent={this.handleUpdate} />
		);
	}
}