import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'

import { setContext } from '@apollo/link-context';

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import './index.css';
import App from './App';
import { SIGN_IN_TOKEN } from './utils/constants';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(SIGN_IN_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/graphql'
  : 'https://halfeatenbiscuit.herokuapp.com/graphql'

const httpLink = new HttpLink({ uri: uri })

const wsLink = new WebSocketLink({
  uri: process.env.NODE_ENV === 'development'
    ? 'ws://localhost:3001/graphql'
    : 'ws://halfeatenbiscuit.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //link: authLink.concat(httpLink)
  link: splitLink,
  connectToDevTools: true
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

