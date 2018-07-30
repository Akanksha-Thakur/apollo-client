import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from 'apollo-link';
import gql from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers } from './src/dog';
import App from './App';

const cache = new InMemoryCache();

const httpLink = new HttpLink({uri: "https://nx9zvp49q7.lp.gql.zone/graphql"});


const stateLink = withClientState({
  resolvers,
  defaults,
  cache,
});

const link = ApolloLink.from([stateLink, httpLink]);

export const client = new ApolloClient({
  cache,
  link,
});


const View = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);

AppRegistry.registerComponent('Apollo_Client', () => View);
