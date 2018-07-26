import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Form, Item, Input } from 'native-base';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const ADD_TODO = gql`
  mutation addTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
  	super(props);
  	this.state = {
      data: '',
    };
  }

  // onDogFetched = dog => this.setState(() => ({ dog }));

  render() {
    console.log(this.props);
    let input;
    return (
      <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <View>
          <Form>
            <Item>
              <Input value={this.state.data} onChange={(text) => this.setState({ data: text })} />
            </Item>
            <Button onPress={() => {
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
            title="Add Todo"
          />
          </Form>
        </View>
      )}
    </Mutation>
    );
  }
}
