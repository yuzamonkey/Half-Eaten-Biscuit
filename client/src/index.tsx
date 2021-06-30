import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'

import { setContext } from '@apollo/link-context';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

