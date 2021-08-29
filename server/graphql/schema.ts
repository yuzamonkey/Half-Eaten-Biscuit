const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type UserCategory {
    id: ID!
    name: String!
    profession: String!
    parent: UserCategory
    children: [UserCategory]
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
    object: UserCategoryOrGroupCategory
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
    conversations: [ConversationObject]!
    profile: UserProfile!
    groups: [Group]!
    available: Boolean!
    kind: String!
    notifications: [NotificationObject]!
  }

  type Group {
    id: ID!
    users: [User!]!
    profile: GroupProfile!
    jobAds: [JobAd]!
    conversations: [ConversationObject]!
    kind: String!
    notifications: [NotificationObject]!
  }

  type NotificationObject {
    seen: Boolean
    object: Notification
  }

  type ConversationObject {
    hasUnreadMessages: Boolean
    object: Conversation
  }

  type UserProfile {
    id: ID!
    user: User!
    name: String!,
    firstName: String!,
    lastName: String!,
    about: String,
    image: String,
    categories: [UserCategory],
    isEditedByUser: Boolean!
  }

  type GroupProfile {
    id: ID!
    group: Group!
    name: String!
    about: String
    image: String
    categories: [GroupCategory]
  }

  type Notification {
    id: ID!
    date: Date
    content: String,
    link: String,
    relatedObject: NotificationRelatedObject,
    receivers: [ID]!
  }

  type Token {
    value: String!,
    id: ID!
  }

  union NotificationRelatedObject = JobAd

  union UserOrGroup = User | Group

  union UserCategoryOrGroupCategory = UserCategory | GroupCategory

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
    allUserCategories: [UserCategory]
    allGroupCategories: [GroupCategory]
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
      categories: [ID]!,
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
      categories: [ID]!
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
    setConversationAsSeen(
      currentProfileId: ID!
      conversationId: ID!
    ): UserOrGroup
    sendMessage(
      senderId: ID!
      conversationId: ID!
      body: String!
    ): Message
    addUserCategory(
      name: String!
      profession: String!
      parent: String
    ): UserCategory
    addGroupCategory(
      name: String!
      parent: String
    ): GroupCategory
  }

  type Subscription {
    messageAdded(userOrGroupIds: [ID]!): Conversation!
    notificationAdded(userOrGroupIds: [ID]!): Notification!
  }
`

module.exports = typeDefs
