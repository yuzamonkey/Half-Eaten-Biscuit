"use strict";
/*
GIVEN: create
WHEN: we do smth with the creation
THEN: we check that the result is wanted
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNUP = void 0;
const apollo_server_1 = require("apollo-server");
const apolloConfig_1 = require("../utils/apolloConfig");
const testingEnvironment_1 = require("../utils/testingEnvironment");
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const User = require('../models/user');
const ALL_USERS = apollo_server_1.gql `
  query {
    allUsers {
      username
    }
  }
`;
exports.SIGNUP = apollo_server_1.gql `
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
}
`;
describe('apollo server integration users', () => {
    let server = new apollo_server_1.ApolloServer(apolloConfig_1.createConfig(null));
    beforeAll(async () => {
        await testingEnvironment_1.connectDB();
        await User.deleteMany({});
        //server = new ApolloServer(createConfig(null));
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    test('sign up works', async () => {
        var _a;
        const result = await server.executeOperation({
            query: exports.SIGNUP,
            variables: ({
                username: 'MOCKUSER',
                password: 'MOCKPASSWORD'
            })
        });
        expect(result.errors).toBeUndefined();
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.createUser.username).toBe('MOCKUSER');
    });
    test('there is only one user in db', async () => {
        var _a;
        const result = await server.executeOperation({
            query: ALL_USERS
        });
        expect(result.errors).toBeUndefined();
        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.allUsers).toHaveLength(1);
    });
});
