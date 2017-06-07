import React from "react";
import PropTypes from "prop-types";
import { FIELD_PROPS } from "./FieldProps";


export default class Radio extends React.Component {
	static propTypes = {
		...FIELD_PROPS,
		label: PropTypes.string,
		options: React.PropTypes.arrayOf(React.PropTypes.shape({
			label: React.PropTypes.string.isRequired,
			selected: React.PropTypes.bool,
			value: React.PropTypes.string,
		})).isRequired,
	};

	constructor(props) {
		super(props);

		this.state = { value: "" };

		this.handleUpdate = this.handleUpdate.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value });
	}

	handleUpdate(event) {
		this.setState({ value: this.props.updateParent(this.props.id, this.state.value) });
	}

	onChange(event) {
		this.setState({ value: event.target.value });
	}

	render() {
		let radioButtons = [];
		this.props.options.forEach(function(element) {
			radioButtons.push(
				<label>
					<input type="radio" value={element.value} checked={element.selected} />
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
