import React from "react";
import PropTypes from "prop-types";
import {FIELD_PROPS} from "../shared/FieldProps";


export default class TextInput extends React.Component {
    static propTypes = {
        ...FIELD_PROPS,
        label: PropTypes.string,
    };

    constructor(props){
        super(props);
        
        this.state = {value: ""};

        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
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
                <span> {this.props.label} </span>
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
