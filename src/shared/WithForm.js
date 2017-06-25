import React from "react";
import PropTypes from "prop-types";
import { FIELD_PROPS } from "./FieldProps";

export default function withForm(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        static contextTypes = {
            register: PropTypes.func,
            updateForm: PropTypes.func,
            formState: PropTypes.object,
        }

        componentWillMount(){
            if (this.context.register){
                this.context.register(this.props.id, this);
            }
        }

        render() {
            if (!this.context.formState){
                console.warn("ERROR: Can not render "+ WrappedComponent.name +"@" + this.props.id + " properly. Missing form context.");
                return null;
            }
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent {...this.props} updateParent={this.context.updateForm} {...this.context.formState[this.props.id]}/>;
        }
    };
}