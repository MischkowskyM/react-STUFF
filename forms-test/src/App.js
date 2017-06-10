import React, { Component } from 'react';
import Field from "./shared/Field";
import NormalizedField from "./shared/NormalizedField";
import FieldWrapper from "./FieldWrapper";
import Radio from "./shared/Radio";
import {connect} from "react-redux"

function required(value){
	if (!value) {
		return "Dies ist ein Pflichtfeld";
	}
}

function notFoo(value){
	if (value.toLowerCase() === "foo"){
		return "Darf nicht foo sein.";
	}
}

function normalizationTest(value){
	return value.toUpperCase();
}

class App extends Component {
	render() {
		const defaultState = {Name:{value:"asd"},Foo:{value:"ASD"},Radio:{"value":"1"}};
		return (
			<div className="App">
				<FieldWrapper >
					<Field label="Name:" id="Name" validate={required} />
					<br/>
					<NormalizedField label="Foo!" id="Foo" validate={[required, notFoo]} normalize={normalizationTest} />
					<br/>
					<Radio label="Foo!" id="Radio" validate={required} options={[{label:"1", value:"1"},{label:"2", value:"2"}]} />
					<br/>
					<input type="submit" ></input>
				</FieldWrapper>
			</div>
		);
	}
}

export default connect()(App);
