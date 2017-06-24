import React, { Component } from 'react';
import TextInput from "./formcomponents/TextInput";
import NormalizedTextInput from "./formcomponents/NormalizedTextInput";
import Form from "./Form";
import RadioInput from "./formcomponents/RadioInput";
import SelectInput from "./formcomponents/SelectInput";
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
	console.log("Normal.")
	return value.toUpperCase();
}


class App extends Component {
	render() {
		return (
			<div className="App">
				<Form >
					<TextInput label="Name:" id="Name" validate={required} />
					<br/>
					<NormalizedTextInput label="Foo!" id="Foo" validate={[required, notFoo]} normalize={normalizationTest} />
					<br/>
					<RadioInput label="Foo!" id="Radio" validate={required} options={[{label:"1", value:"1"},{label:"2", value:"2"}]} />
					<br/>
						<div>
							<SelectInput label="Select one!" id="select" validate={required} options={[{label:"1", value:"1"},{label:"2", value:"2"}]} />
						</div>
					<br/>
					<input type="submit" ></input>
				</Form>
			</div>
		);
	}
}

export default connect()(App);
