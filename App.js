import React from "react";
import FlatListDemo from "./screens/FlatList"
import Form from "./screens/StudentForm"
import api from "./utilities/api";
import data from './studentdata.json' //used to be ./utilities/studentdata.json
import {  View, 
          Button,
          Text, 
          FlatList,
          List,
          Alert,
          StyleSheet,
          ActivityIndicator,
          ListItem,
          TouchableOpacity} from "react-native";
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator, createAppContainer } from "react-navigation";


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      students: [],
    }
  }
  
  componentWillMount(){
    api.getUsers().then((res)=> {
      this.setState({
        students: res,
        studentName: res[0].name
      })
        // console.log(res) the whole list
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'lavender' }}>
       
        <Text style ={styles.title}> Welcome Professor Hwang </Text>
         <Button
          title="View Flatlist Demo"
          onPress={() => this.props.navigation.navigate('Details')}
        />
         <Button
          title="View CS Student List"
          onPress={() => this.props.navigation.navigate('CSList')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Details Screen</Text>
        <FlatListDemo/>
      </View>
    );
  }
}

class AddStudentForm extends React.Component {
  render(){
    return(
      <View>
        <Form/>
      </View>
    )
  }
}

class StudentList extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      isLoading: true,
      checked: false,
    }
  }

    componentDidMount(){
    this.setState({
      isLoading: false,
      dataSource: data.info
    })
  }

  render() {
    //show waiting screen when json data is fetch
     if(this.state.isLoading){
       return(
         <View>
          <ActivityIndicator/>
        </View> 
       )
     }
    return (
     // Add a list map with a link for the first item. 
       <View style = {styles.pageView}> 
       <FlatList
          style = {{width: '100%'}}
          data = {this.state.dataSource}
          renderItem={({item}) => {
            return(
              <View style = {styles.row}>
                <Button
                  style = {styles.buttonLink}
                  color="black"
                  onPress={() => {
                    this.props.navigation.navigate('Profile', {
                      name: item.name,
                      cptg121: item.cptg121,
                      cptg122: item.cptg122,
                      cptg244: item.cptg244,
                      cptg255: item.cptg255,
                      cptg324: item.cptg324,
                      cptg434: item.cptg434,
                      cptg445: item.cptg445,
                      grade121: item.grade121,
                      grade122: item.grade122,
                      grade244: item.grade244,
                      grade255: item.grade255,
                      grade324: item.grade324,
                      grade434: item.grade434,
                      grade445: item.grade445,
                    }
                    )
                    this.setState({
                      checked: item.cptg121
                    })
                     }}
                  title={item.name}
                  /> 
                </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          />

         <TouchableOpacity>
          <Button
          style = {styles.container}
          title="Add a Student"
          onPress={() => this.props.navigation.navigate('AddStudent')}
        />
        </TouchableOpacity>

         <Button
          // icon = 
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />

      </View>
    );
  }
}


class StudentProfile extends React.Component{
  constructor(props){
    super(props);
    // console.warn(props.navigation.state.params.name)
      this.state = { 
        checked: props.navigation.state.params.cptg121,
        checked2: props.navigation.state.params.cptg122,
    }
  }


  render(){
    const {params} = this.props.navigation.state
    const cptg121status = params.cptg121
    

    return(
      <View style = {styles.pageView}>
        <Text style ={styles.title}> {params.name} </Text> 
         <CheckBox //cptg121
                checked = {this.state.checked}
                title = 'CPTG121 Has Been Taken'
                onPress={() => {
                  this.setState({
                    checked: !this.state.checked
                  }) }
                }
            />
             <CheckBox //cptg122
                checked = {this.state.checked2}
                title = 'CPTG121 Has Been Taken'
                onPress={() => {
                  this.setState({
                    checked2: !this.state.checked2
                  }) }
                }
            />
        <Text>
          { params.cptg121 === true ? <Text style={styles.taken}> CPTG 121 ......... {params.grade121} </Text> : <Text style = {styles.notTaken}> CPTG 121 </Text>}  {"\n"}
          { params.cptg122 === true ? <Text style={styles.taken}> CPTG 122 ......... {params.grade122} </Text> : <Text style = {styles.notTaken}> CPTG 122 </Text> } {"\n"}
          { params.cptg244 === true ? <Text style={styles.taken}> CPTG 244 ......... {params.grade244} </Text> : <Text style = {styles.notTaken}> CPTG 244 </Text> } {"\n"}
          { params.cptg255 === true ? <Text style={styles.taken}> CPTG 255 ......... {params.grade255} </Text> : <Text style = {styles.notTaken}> CPTG 255 </Text> } {"\n"}
          { params.cptg324 === true ? <Text style={styles.taken}> CPTG 324 ......... {params.grade324} </Text> : <Text style = {styles.notTaken}> CPTG 324 </Text> } {"\n"}
          { params.cptg434 === true ? <Text style={styles.taken}> CPTG 434 ......... {params.grade434} </Text> : <Text style = {styles.notTaken}> CPTG 434 </Text> } {"\n"}
          { params.cptg445 === true ? <Text style={styles.taken}> CPTG 445 ......... {params.grade445} </Text> : <Text style = {styles.notTaken}> CPTG 445 </Text> } {"\n"}
         </Text>
        </View>
    )
  }
} //end StudentProfile

// NAVIGATION

const AppNavigator = createStackNavigator
({
  Home: HomeScreen,
  CSList: StudentList,
  Details: DetailsScreen,
  AddStudent: AddStudentForm,
  Profile: StudentProfile
  
},
 {
    initialRouteName: "Home"
  });

//STYLES
  const styles = StyleSheet.create({
    container: {
  //  flex: 1,
   paddingTop: 10,
   alignItems: 'center',
  },
  pageView:{
    flex: 1,
  },
  title: {
    margin: 10,
    color: 'black',
    fontSize: 50,
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
  },
  row: {
   flex: 1,
   paddingVertical: 10,
   paddingHorizontal: 115,
   flexDirection: 'row',
   justifyContent: 'space-between',
   borderBottomWidth: 0.2,
   borderBottomColor: 'grey',
  },
  // classList: {
  //   textAlign: 'center',
  // },
  buttonLink: {
    fontSize: 40,
    lineHeight:40,
    fontFamily: 'Avenir',
    position: 'absolute',
  },
  addStudentButton: {
     position: 'absolute',
     right: 0,
     bottom:0,
  },
  notTaken: {
    paddingVertical: 15,
    color: 'red',
    fontSize: 15,
    position: 'absolute',
    right: 0,
    bottom: 0,
    textAlign: 'center',
  },
  taken: {
    paddingVertical: 15,
    color: 'green',
    fontSize: 15,
    alignSelf: 'flex-end',  
    textAlign: 'center',
  }
});

export default createAppContainer(AppNavigator);