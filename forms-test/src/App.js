import React, { Component } from 'react';
import Field from "./shared/Field";
import NormalizedField from "./shared/NormalizedField";
import FieldWrapper from "./FieldWrapper";
import Radio from "./shared/Radio";
import {connect} from "react-redux"


/*
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }, */

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
		return (
			<div className="App">
				<FieldWrapper defaults={{Name: "Earl", Foo: "Foo!"}}>
					<Field label="Name:" id="Name" validate={required} />
					<br/>
					<NormalizedField label="Foo!" id="Foo" validate={[required, notFoo]} normalize={normalizationTest} />
					<br/>
					<input type="submit" ></input>
					<br/>
					<Radio label="Foo!" id="Radio" options={[{label:"1", value:"1"},{label:"2", value:"2"}]} />
				</FieldWrapper>
			</div>
		);
	}
}

export default connect()(App);
