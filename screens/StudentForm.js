import React, {Component} from "react";
import { View, Text, FlatList } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements'


class Form extends Component{
    constructor(){
        super();

        this.state = {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false
        }
    }

    render(){
        return(
            <View>
            <FormLabel>Name</FormLabel>
            <FormInput/>
            
            <FormLabel> CPTG 121</FormLabel>
             <CheckBox
              value={this.state.checkbox1}
              onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
        />

        <FormLabel> CPTG 122 </FormLabel>
        <CheckBox
          value={this.state.checkbox2}
          onChange={() => this.setState({ checkbox2: !this.state.checkbox2 })}
        />

        <FormLabel> CPTG 224 </FormLabel>
        <CheckBox
          value={this.state.checkbox3}
          onChange={() => this.setState({ checkbox3: !this.state.checkbox3 })}
        />


            <FormValidationMessage>Error message</FormValidationMessage>

            </View>

        ) //end return
    } // end render
}
export default Form;