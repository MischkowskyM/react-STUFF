import React from "react";
import PropTypes from "prop-types";
import {FIELD_PROPS} from "../shared/FieldProps";


export default class RadioInput extends React.Component {
	static propTypes = {
		...FIELD_PROPS,
		label: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string.isRequired,
			selected: PropTypes.bool,
			value: PropTypes.string,
		})).isRequired,
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
		let radioButtons = this.props.options.map(function(element) {
			return (
				<label key={this.props.id + "_" + element.value}>
					<input type="radio" name={this.props.id}
						onChange={this.onChange}
						value={element.value} checked={element.selected} />
					{element.label}
				</label>)
		}, this);
		return (
			<div>
				<span> {this.props.label} </span>
				{radioButtons}
				{this.props.error &&
					<span>{this.props.error}</span>
				}
			</div>
		)
	}
}
