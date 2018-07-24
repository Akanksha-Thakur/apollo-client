import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';

export const client = new ApolloClient({
  link: new HttpLink({uri: "https://nx9zvp49q7.lp.gql.zone/graphql"}),
  cache: new InMemoryCache({
     dataIdFromObject: object => object.__typename || null,
  }),
});

const View = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);

AppRegistry.registerComponent('Apollo_Client', () => View);
