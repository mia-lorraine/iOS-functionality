import React, {Component} from "react";
import axios from "axios";
import { TouchableHighlight, TouchableOpacity, StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Button } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

let name;

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            // cptg121: false,
            checked: false,
            checked1: false
            
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
        collection.email=this.state.email,
        collection.checked=this.state.checked,
        collection.checked1=this.state.checked1
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
            email: collection.email,
            cptg121: collection.checked,
            cptg122: collection.checked1
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

    // updateCheckBox(check, field){
    //        if(field=='cptg121'){
    //         this.setState({
    //             cptg121: !this.state.cptg121,
    //         })
    //     }
    // }

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
        
            <CheckBox 
                checked = {this.state.checked}
                style = {{margin:10,flex:1,height:60,backgroundColor:'lavender',justifyContent:'center'}}
                title = 'CPTG121'
                onPress={() => {
                    console.warn("CPTG121 is", !this.state.checked)
                    const newState = !this.state.checked
                    this.setState({
                        checked: newState})
                        }
                }
            />

              <CheckBox 
                checked = {this.state.checked1}
                style = {{margin:10,flex:1,height:60,backgroundColor:'lavender',justifyContent:'center'}}
                title = 'CPTG122'
                onPress={() => {
                    console.warn("CPTG122 is", !this.state.checked1)
                    const newState1 = !this.state.checked1
                    this.setState({
                        checked1: newState1})
                        }
                }
            /> 

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