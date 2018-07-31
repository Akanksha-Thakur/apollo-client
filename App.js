import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  // AsyncStorage,
} from 'react-native';
import { compose, graphql, Query } from 'react-apollo';
import { GET_DOG, getUpdate } from './src/dog'
import { persistor } from './index';


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



type Props = {};
class App extends Component<Props> {
  constructor(props){
  	super(props);
    // this.getCache = this.getCache.bind(this);
  	this.state = {};
  }

  componentWillMount() {
    // AsyncStorage.getItem('apollo-schema-version').then((x) => {
    //   console.log('AsyncStorage version key', x);
    // });
    // persistor.restore()
    // .then(() => {
    //   console.log('data persist');
    // });
  }

  componentDidMount() {
    // persistor.getLogs();
    // persistor.getSize().then((x) => console.log('*************size**********', x));
  }

  componentWillUnmount() {
    // persistor.persist();
  }

  // getCache() {
    // const data = client.readQuery({ query: GET_DOG });
    // debugger
    // client.writeQuery({
    //   query: GET_DOG,
    //   data: {
    //     dog: {
    //       id: data.dog.id,
    //       breed: data.dog.breed,
    //       displayImage: data.dog.displayImage,
    //       __typename: 'dog',
    //     },
    //   },
    // });
    // console.log(client.cache);
  // }

  render() {
    console.log('~~~~~~~~~~data~~~~~~~~~~~~~', this.props);
    return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           {this.props.dog.loading ?
             <Text>Loading...</Text>
             :
             <View>
               <Image
                 source={{ uri: this.props.dog.dog.displayImage }}
                 style={{ width: 200, height: 200 }}
               />
               <Text>
                 {this.props.dog.dog.breed}
               </Text>
             </View>
          }
         </View>
       )
     }
}


export default compose(graphql(getUpdate, { name: 'dog'}))(App)
