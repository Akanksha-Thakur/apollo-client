import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import gql from "graphql-tag";
import { ApolloConsumer } from 'react-apollo';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// const GET_DOG = gql`
//   query {
//     dog(breed: "pavilion") {
//       id
//       breed
//       displayImage
//     }
//   }
// `
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
  	super(props);
  	this.state = {
      dog: null,
    };
  }

  onDogFetched = dog => this.setState(() => ({ dog }));

  render() {
    console.log(this.props);
    return (
      <ApolloConsumer>
         {client => (
           <View>
             {this.state.dog &&
               <Image
                 source={{uri: this.state.dog.displayImage}}
                 style={{height: 100, width: 100}}
               />
             }
             <TouchableOpacity
               onPress={async () => {
                 const { data } = await client.query({
                   query: GET_DOG_PHOTO,
                   variables: { breed: "bulldog" }
                 }).then((data) => {

                   this.onDogFetched(data.dog);
                 })
               }}
             >
               <Text>
                 Click me!
               </Text>
             </TouchableOpacity>
           </View>
         )}
       </ApolloConsumer>
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
