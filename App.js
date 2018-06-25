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


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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
  render() {
    console.log(this.props);
    return (
      <Query query={GET_DOG} pollInterval={500}>
     {({ loading, error, data, startPolling, stopPolling }) => {
       if (loading) return <Text>Loading...</Text>;
       if (error) return <Text>Error :(</Text>;

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
