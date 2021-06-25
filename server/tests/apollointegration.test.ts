/*
GIVEN: create
WHEN: we do smth with the creation
THEN: we check that the result is wanted
*/

import { ApolloServer, gql } from 'apollo-server'
import { createConfig } from '../utils/apolloConfig';

import mongoose from 'mongoose';
import { connectDB } from '../utils/testingEnvironment';

const User = require('../models/user')

const ALL_USERS = gql`
  query {
    allUsers {
      username
    }
  }
`
export const SIGNUP = gql`
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
}
`

describe('apollo server integration users', () => {

  let server = null;

  beforeAll(async () => {
    const db = await connectDB()
    await User.deleteMany({})
    server = new ApolloServer(createConfig(null));
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('sign up works', async () => {
    const result = await server.executeOperation({
      query: SIGNUP,
      variables: ({
        username: 'MOCKUSER',
        password: 'MOCKPASSWORD'
      })
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createUser.username).toBe('MOCKUSER')
  })

  test('there is only one user in db', async () => {
    const result = await server.executeOperation({
      query: ALL_USERS
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.allUsers).toHaveLength(1)
  })


})