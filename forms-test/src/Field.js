import React from "react";
import PropTypes from "prop-types";
import {FIELD_PROPS} from "./shared/FieldProps";

export class NormalizedField extends React.Component{
        static propTypes = {
        ...FIELD_PROPS,
        normalize: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.array
        ])
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
			let error = "";
			for (let i = 0; i < normalize.length; i++){
				normalizedValue = normalize[i](normalizedValue);
			}
		}
		return normalizedValue;
	}

    handleUpdate(id, value){
        let normalizedValue = value;
        normalizedValue = this.normalizeChild(normalizedValue)

        return this.props.updateParent(id, normalizedValue);
    }

    render() {
		return (
            <Field
             	id={this.props.id}
                value={this.props.value}
                validate={this.props.validate}
                error={this.props.error}
                updateParent={this.handleUpdate} />
		);
	}
}


export default class Field extends React.Component {
    static propTypes = {
        ...FIELD_PROPS,
        label: PropTypes.string,
    };

    constructor(props){
        super(props);
        this.state = {value: this.props.value || ""};

        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleUpdate(event){
        this.setState({value: this.props.updateParent(this.props.id, this.state.value) });
    }

    onChange(event){
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <input id={this.props.id} 
                    onBlur={this.handleUpdate}
                    onChange={this.onChange}
                    value={this.state.value} />
                {this.props.error && 
					<span>{this.props.error}</span>
				}
            </div>
        )
    }
}
