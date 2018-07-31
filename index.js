import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from 'apollo-link';
import { CachePersistor } from 'apollo-cache-persist';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers } from './src/dog';
import App from './App';

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    switch (object.__typename) {
    case 'dog': return object.__typename; // use `key` as the primary key
    default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  },
});

const httpLink = new HttpLink({uri: "https://nx9zvp49q7.lp.gql.zone/graphql"});


const stateLink = withClientState({
  resolvers,
  defaults,
  cache,
});

const link = ApolloLink.from([stateLink, httpLink]);

export const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  maxSize: false,
  debug: true,
  trigger: 'background',
})

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
