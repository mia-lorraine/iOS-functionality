import React from "react";
import FlatListDemo from "./screens/FlatList"
import Form from "./screens/StudentForm"
import api from "./utilities/api";
import data from './utilities/studentdata.json'
import { View, 
          Text, 
          Button, 
          FlatList, 
          List,
          ActivityIndicator } from "react-native";
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       
        <Text>Home Screen</Text>
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
       {/*  */}

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
         <View style = {{flex: 1, padding: 20}}>
       <ActivityIndicator/>
       </View> 
       )
     }
    return (
     // Add a list map with a link for the first item. 
       <View> 
       <FlatList
          data = {this.state.dataSource}
          renderItem={({item}) => {
            return(
              <View>
                <Text> {item.name} has taken {item.fall15}. </Text>
                </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          />

         <Button
          title="Add a Student"
          // data = {this.state.dataSource}
          onPress={() => this.props.navigation.navigate('AddStudent')}
        />

         <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator
({
  Home: HomeScreen,
  CSList: StudentList,
  Details: DetailsScreen,
  AddStudent: AddStudentForm
},
 {
    initialRouteName: "Home"
  });

export default createAppContainer(AppNavigator);