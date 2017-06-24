import React from "react";
import PropTypes from "prop-types";
import {FIELD_PROPS} from "../shared/FieldProps";
import inForm from "../shared/InForm";

export class SelectInput extends React.Component{
        static propTypes = {
        ...FIELD_PROPS,
		options: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string,
		})).isRequired,
		label: PropTypes.string
    };

	constructor(props) {
		super(props);

		this.state = { value: "" };
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({ value: this.props.updateParent(this.props.id,  event.target.value) });
	}

    render() {
		let options = this.props.options.map(option => {
			return 	<option value={option.value} key={this.props.id + "_" + option.value}>
						{option.label}
					</option>
		});
		return(
			<label>
				{this.props.label}
				<select value={this.state.value} onChange={this.onChange} onBlur={this.onChange}>
					<option value="" disabled={true}>Please choose</option>
					{options}
				</select>
                {this.props.error && 
					<span>{this.props.error}</span>
				}
            </label>
		);
	}
}
export default inForm(SelectInput);