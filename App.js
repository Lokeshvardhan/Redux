import { StatusBar } from 'expo-status-bar';
import React,{useEffect , useReducer} from 'react';
import * as axios from 'react-native-axios';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const initialState = {
  loading :true,
  error:'',
  todos: []
};

const reducer = (state, action) =>{
  switch(action.type){
    case 'SET_DATA':
      return{
        loading :false,
        error:'',
        todos: action.payload
      }

      case 'SET_ERROR':
        return{
          loading :false,
          error:'THERE are some errors  ',
          todos: action.payload
        }
        default:
        return state;
  }
}
const App = () =>{
  const [state, dispatch] = useReducer(reducer , initialState);
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/todos/")
    .then(res =>{
      console.log(res.data);
      dispatch({type:'SET_DATA' , payload: res.data})
    })
    .catch(err =>{
      dispatch({type: 'SET_ERROR'})
    })
  },[]);
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.id}</Text>
    <Text>{item.title}</Text>
    </View>
  );
  // let listmarkup = 
    
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* {state.loading?'Laoding':state.error? state.error:listmarkup} */}
      <FlatList 
      data={state.todos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
