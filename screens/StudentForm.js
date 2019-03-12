import React, {Component} from "react";
import axios from "axios";
import { TouchableHighlight, TouchableOpacity, StyleSheet, View, Text, FlatList, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, CheckBox, Button } from 'react-native-elements'
import { Header } from 'react-navigation';

let name;

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            language: '',
            checked: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false, 
            checked5: false,
            checked6: false,
            checked7: false,
        }
    }

    updateValue(text, field){
        if(field=='name'){
            this.setState({
                name:text,
            })
        }
    }

    submit() {
        // collects data 
        let collection={}
        collection.name=this.state.name,
        collection.checked=this.state.checked,
        collection.checked1=this.state.checked1
        collection.checked2=this.state.checked2
        collection.checked3=this.state.checked3
        collection.checked4=this.state.checked4
        collection.checked5=this.state.checked5
        collection.checked6=this.state.checked6
        collection.checked7=this.state.checked7
        console.warn(collection);
    
    fetch(`http://localhost:3001/info`, {
            method: 'POST',
            headers: {
            Accept: 
            'application/json',
            'Content-Type': 'application/json',
             },
            body: JSON.stringify({
            cptg121: collection.checked,
            cptg122: collection.checked1,
            cptg244: collection.checked2,
            cptg245: collection.checked3,
            cptg255: collection.checked4,
            cptg324: collection.checked5,
            cptg434: collection.checked6,
            cptg445: collection.checked7
          }),
        })
        .then((res) => {
            console.log(res)
        })
         .catch(err => {
        console.log('caught an error', err);
        });
    }

    render(){
        return(
            <View>
            <FormLabel> Enter a Student Name </FormLabel>
             <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={(text)=> this.updateValue(text, 'name')}
                />

            <KeyboardAvoidingView
                keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
                style = {{ flex: 1 }}
                behavior = "padding" >

  <ScrollView>
    <TextInput/>
    <TextInput/>
    <TextInput/>
    <TextInput/>
    <TextInput/>
    <TextInput/>
  </ScrollView> 

</KeyboardAvoidingView>    
            
            <CheckBox 
                checked = {this.state.checked}
                style = {{margin:10,flex:1,height:60,backgroundColor:'lavender',justifyContent:'center'}}
                title = 'CPTG121'
                onPress={() => {
                    // console.warn("CPTG121 is", !this.state.checked)
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
                    // console.warn("CPTG122 is", !this.state.checked1)
                    const newState1 = !this.state.checked1
                    this.setState({
                        checked1: newState1})
                        }
                }
            /> 

             <CheckBox 
                checked = {this.state.checked2}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG244'
                onPress={() => {
                    // console.warn("CPTG244 is", !this.state.checked2)
                    const newState2 = !this.state.checked2
                    this.setState({
                        checked2: newState2})
                        }
                }
            /> 

             <CheckBox 
                checked = {this.state.checked3}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG245'
                onPress={() => {
                    // console.warn("CPTG245 is", !this.state.checked3)
                    const newState3 = !this.state.checked3
                    this.setState({
                        checked3: newState3})
                        }
                }
            /> 

                <CheckBox 
                checked = {this.state.checked4}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG255'
                onPress={() => {
                    // console.warn("CPTG255 is", !this.state.checked4)
                    const newState4 = !this.state.checked4
                    this.setState({
                        checked4: newState4})
                        }
                }
            /> 

          <CheckBox 
                checked = {this.state.checked5}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG324'
                onPress={() => {
                    // console.warn("CPTG324 is", !this.state.checked5)
                    const newState5 = !this.state.checked5
                    this.setState({
                        checked5: newState5})
                        }
                }
            /> 

            <CheckBox 
                checked = {this.state.checked6}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG434'
                onPress={() => {
                    // console.warn("CPTG434 is", !this.state.checked6)
                    const newState6 = !this.state.checked6
                    this.setState({
                        checked6: newState6})
                        }
                }
            /> 

                 <CheckBox 
                checked = {this.state.checked7}
                style = {{margin:10,flex:1,height:60,justifyContent:'center'}}
                title = 'CPTG445'
                onPress={() => {
                    // console.warn("CPTG445 is", !this.state.checked7)
                    const newState7 = !this.state.checked7
                    this.setState({
                        checked7: newState7})
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
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },

    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',

    },
});

export default Form;