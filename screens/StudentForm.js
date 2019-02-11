import React, {Component} from "react";
import axios from "axios";
import { View, Text, FlatList, TextInput } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Button } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

let name;

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false
        }
    }

    submit() {
        axios
        .post(`http://localhost:3001`, {
            name: name,
        })
        .then((res) => {
            console.log(res)
        })
         .catch(function (error) {
    // handle error
    console.log(error);
  })
    }

    checkboxHandler(){
        this.setState({
            checked: !this.state.checked
        })
        console.log(this.state.checked)
    }

    render(){
        return(
            <View>
            <FormLabel>  Name </FormLabel>
            <FormInput
                textInputRef = {name}/>
            
            <CheckBox
                checked = {this.state.checked}
                onChange = {this.checkboxHandler}/>

            <FormValidationMessage>Error message</FormValidationMessage>

        <Button 
        onPress = {this.submit}
        title = "Submit"
        > submit </Button>
            
        </View>

        ) //end return
    } // end render
}
export default Form;