import React, {Component} from "react";
import axios from "axios";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Button } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

let name;

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            checked: false,
            
        }
    }

    updateValue(text, field){
        if(field=='name'){
            this.setState({
                name:text,
            })
        } else if(field == 'email'){
            this.setState({
                email:text,
            })
        }
    }

    submit() {
        let collection={}
        collection.name=this.state.name,
        collection.email=this.state.email
        console.warn(collection);
    //     
    fetch(`http://localhost:3001/info`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
             },
            body: JSON.stringify({
            name: collection.name,
            email: collection.email
          }),
        })
        .then((res) => {
            console.log(res)
        })
         .catch(err => {
        console.log('caught an error', err);
        });
    // name.value = ''
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
             <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={(text)=> this.updateValue(text, 'name')}
                />
                 
            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={(text)=> this.updateValue(text, 'email')}
                />
        

            {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <Button 
        onPress = {()=>this.submit()}
        title = "Submit"
        > submit </Button>
        </View>

        ) //end return
    } // end render
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',

    },
});

export default Form;