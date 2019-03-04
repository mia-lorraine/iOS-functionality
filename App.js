import React from "react";
import FlatListDemo from "./screens/FlatList"
import Form from "./screens/StudentForm"
import api from "./utilities/api";
import data from './studentdata.json' //used to be ./utilities/studentdata.json
import { View, 
          Button,
          Text, 
          FlatList,
          List,
          Alert,
          StyleSheet,
          ActivityIndicator,
          ListItem,
          TouchableOpacity} from "react-native";
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
      isLoading: true
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
                      cptg324: item.cptg324,
                      cptg445: item.cptg445
                    }
                    )
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
  render(){
    const {params} = this.props.navigation.state
    console.warn(params) //views the parameters~ 
    // console.warn(params.name)
    return(
      <View style = {styles.pageView}>
        <Text style ={styles.title}> {params.name} </Text>
        <View style = {styles.list}>
        <Text style = {styles.classList}> 
        { params.cptg121 === true ? <Text> CPTG 121 </Text> : <Text> not taken cptg121 </Text> } {"\n"}
        { params.cptg122 === true ? <Text> CPTG 122 </Text> : <Text> not taken cptg122 </Text> } {"\n"}
        { params.cptg244 === true ? <Text> CPTG 244 </Text> : <Text> not taken cptg244 </Text> } {"\n"}
        { params.cptg255 === true ? <Text> CPTG 255 </Text> : <Text> not taken cptg255 </Text> } {"\n"}
        </Text>
         </View>
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
  classList: {
    // flex:1,
    paddingVertical: 5,
    textAlign: 'center',
  },
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
  }
});

export default createAppContainer(AppNavigator);