const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Message {
    id: ID!
    body: String
    sender: User!
  }

  type Conversation {
    id: ID!
    users: [User]!
    messages: [Message]!
  }

  type Jobquery {
    id: ID!
    content: String!
    date: Date!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
    profile: UserProfile!
    groups: [Group]!
  }

  type Group {
    id: ID!
    name: String!
    users: [User!]!
    profile: GroupProfile!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
  }

  type UserProfile {
    id: ID!
    user: User!
    about: String
  }

  type GroupProfile {
    id: ID!
    group: Group!
    about: String
  }

  type Token {
    value: String!
  }

  type Query {
    allJobqueries: [Jobquery]
    allUsers: [User]!
    allGroups: [Group]!
    findJobqueries(content: String!): [Jobquery],
    findUser(id: ID!): User
    allConversations: [Conversation]
    findConversation(id: ID!): Conversation
    me: User,
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    createGroup(
      name: String!,
      users: [ID!]!
    ): Group
    createJobquery(
      content: String!
    ): Jobquery
    createConversation(
      receiverId: ID!
    ): Conversation
    sendMessage(
      conversationId: ID!
      body: String!
    ): Conversation
  }
`

module.exports = typeDefs