const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type SkillCategory {
    id: ID!
    name: String!
    profession: String!
    parent: SkillCategory
    children: [SkillCategory]
    users: [User]
  }

  type GroupCategory {
    id: ID!
    name: String!
    parent: GroupCategory
    children: [GroupCategory]
    groups: [Group]
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

  type JobAd {
    id: ID!
    content: String!
    postedOn: Date!
    startSchedule: Date!
    endSchedule: Date
    wantedCategories: [WantedCategory!]!
    visible: Boolean!
    postedBy: JobAdPostedBy!
    location: String
    salary: String
  }

  type WantedCategory {
    kind: String,
    object: SkillCategoryOrGroupCategory
  }

  type JobAdPostedBy {
    kind: String,
    object: UserOrGroup
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobAds: [JobAd]!
    conversations: [Conversation]!
    profile: UserProfile!
    groups: [Group]!
    available: Boolean!
    kind: String!
    notifications: [Notification]!
  }

  type Group {
    id: ID!
    users: [User!]!
    profile: GroupProfile!
    jobAds: [JobAd]!
    conversations: [Conversation]!
    kind: String!
    notifications: [Notification]!
  }

  type UserProfile {
    id: ID!
    user: User!
    name: String!,
    firstName: String!,
    lastName: String!,
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

  type Notification {
    id: ID!
    date: Date
    content: String,
    link: String,
    relatedObject: NotificationRelatedObject
  }

  type Token {
    value: String!,
    id: ID!
  }

  union NotificationRelatedObject = JobAd

  union UserOrGroup = User | Group

  union SkillCategoryOrGroupCategory = SkillCategory | GroupCategory

  type Query {
    allJobAds: [JobAd]
    findJobAd(id: ID!): JobAd,
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
    allNotifications: [Notification]!
    me: User,
  }

  type Mutation {
    createUser(
      firstName: String!,
      lastName: String!,
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
    createJobAd(
      content: String!
      startSchedule: Date!
      endSchedule: Date
      wantedCategories: [ID!]!
      postedBy: ID!
      salary: String!
      location: String!
    ): JobAd
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
    notificationAdded: Notification!
  }
`

module.exports = typeDefs
