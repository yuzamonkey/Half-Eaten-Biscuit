const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type SkillCategory {
    id: ID!
    name: String!
    profession: String!
    parent: SkillCategory
    children: [SkillCategory]
  }

  type GroupCategory {
    id: ID!
    name: String!
    parent: GroupCategory
    children: [GroupCategory]
  }

  type Message {
    id: ID!
    body: String!
    sender: Participant!
    time: Date
  }

  type Participant {
    kind: String,
    object: UserOrGroup
  }

  type Conversation {
    id: ID!
    participants: [Participant]!
    messages: [Message]!
  }

  type Jobquery {
    id: ID!
    content: String!
    postedOn: Date!
    startSchedule: Date!
    endSchedule: Date
    wantedCategories: [WantedCategory!]!
    visible: Boolean!
    postedBy: JobqueryPostedBy!
  }

  type WantedCategory {
    kind: String,
    object: SkillCategoryOrGroupCategory
  }

  type JobqueryPostedBy {
    kind: String,
    object: UserOrGroup
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
    profile: UserProfile!
    groups: [Group]!
    available: Boolean!
    kind: String!
  }

  type Group {
    id: ID!
    users: [User!]!
    profile: GroupProfile!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
    kind: String!
  }

  type UserProfile {
    id: ID!
    user: User!
    about: String,
    image: String,
    skills: [SkillCategory],
    isEditedByUser: Boolean!
  }

  type GroupProfile {
    id: ID!
    group: Group!
    name: String!
    about: String
    image: String
    groupTypes: [GroupCategory]
  }

  type Token {
    value: String!,
    id: ID!
  }

  union UserOrGroup = User | Group

  union SkillCategoryOrGroupCategory = SkillCategory | GroupCategory

  type Query {
    allJobqueries: [Jobquery]
    findJobquery(id: ID!): Jobquery,
    allUsers: [User]!
    allUserProfiles: [UserProfile]!
    findUser(id: ID!): User
    allGroups: [Group]!
    findGroup(id: ID!): Group
    allUsersAndGroups: [UserOrGroup]!
    findUserOrGroup(id: ID!): UserOrGroup
    allConversations: [Conversation]
    findConversation(id: ID!): Conversation
    allSkillCategories: [SkillCategory]
    allGroupSkillCategories: [GroupCategory]
    me: User,
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!
    ): User
    createUserProfile(
      skills: [ID]!,
      about: String!,
      image: String
    ): UserProfile
    login(
      username: String!
      password: String!
    ): Token
    editUserProfile(
      about: String
    ): UserProfile
    createGroup(
      name: String!,
      users: [ID!]!,
      about: String!,
      image: String,
      skills: [ID]!
    ): Group
    createJobquery(
      content: String!
      startSchedule: Date!
      endSchedule: Date
      wantedCategories: [ID!]!
      postedBy: ID!
    ): Jobquery
    createConversation(
      senderId: ID!
      receiverId: ID!
    ): Conversation
    sendMessage(
      senderId: ID!
      conversationId: ID!
      body: String!
    ): Message
    addSkillCategory(
      name: String!
      profession: String!
      parent: String
    ): SkillCategory
    addGroupCategory(
      name: String!
      parent: String
    ): GroupCategory
  }

  type Subscription {
    messageAdded: Message!
  }
`

module.exports = typeDefs
