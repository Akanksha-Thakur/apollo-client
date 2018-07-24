import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { client } from './index';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const myNewTodo = {
  id: '6',
  text: 'Start using Apollo Client.',
  completed: false,
  __typename: 'Todo',
};


const GET_DOG = gql`
  query {
    dog(breed: "bulldog") {
      id
      breed
      displayImage
    }
  }
`
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
  	super(props);
    this.getCache = this.getCache.bind(this);
  	this.state = {};
  }

  getCache() {
    console.log(client.cache);
    debugger
    const data = client.readQuery({ query: GET_DOG });
    client.writeQuery({
      query: GET_DOG,
      data: {
        dog: {
          id: data.dog.id,
          breed: data.dog.breed,
          displayImage: data.dog.displayImage,
          __typename: 'dog',
        },
      },
    });
    console.log(client.cache);
    debugger
  }

  render() {
    return (
        <Query query={GET_DOG} pollInterval={500}>
     {({ loading, error, data, startPolling, stopPolling }) => {
       if (loading) return <Text>Loading...</Text>;
       if (error) return <Text>Error :(</Text>;
       if (data) this.getCache();
       return (
         <View>
           <Image
             source={{uri: data.dog.displayImage}}
             style={{width: 100, height: 100}}
           />
           <Text>
             {data.dog.breed}
           </Text>
         </View>
       )
     }}
   </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
