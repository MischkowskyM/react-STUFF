import React, { Component } from 'react';
import Field from "./Field";
import {NormalizedField} from "./Field";
import FieldWrapper from "./FieldWrapper";
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
	console.log("Normalizing", value);
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
				</FieldWrapper>
			</div>
		);
	}
}

export default connect()(App);
