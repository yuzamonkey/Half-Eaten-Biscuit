import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value, 
      id
    }
  }
`

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      username
    }
}
`

export const CREATE_JOBAD= gql`
  mutation createJobAd ($content: String!, $startSchedule: Date!, $endSchedule: Date, $wantedCategories: [ID!]!, $postedBy: ID!, $location: String!, $salary: String!) {
    createJobAd(content: $content, startSchedule: $startSchedule, endSchedule: $endSchedule, wantedCategories: $wantedCategories, postedBy: $postedBy, location: $location, salary: $salary) {
      id
      content
    }
  }
`

export const NEW_CONVERSATION = gql`
  mutation newConversation($senderId: ID!, $receiverId: ID!) {
    createConversation(senderId: $senderId, receiverId: $receiverId) {
      id
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation sendMessage($senderId: ID!, $conversationId: ID!, $body: String!){
    sendMessage(senderId: $senderId, conversationId: $conversationId, body: $body) {
      id, body
    }
  }
`

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $users: [ID!]!, $about: String!, $image: String!, $categories: [ID]!){
    createGroup(name: $name, users: $users, about: $about, image: $image, categories: $categories) {
      id
      kind
    }
  }
`

export const CREATE_USER_PROFILE = gql`
  mutation createUserProfile($categories: [ID]!, $about: String!, $image: String){
    createUserProfile(categories: $categories, about: $about, image: $image) {
      id
      about
    }
  }
`

export const SET_CONVERSATION_AS_SEEN = gql`
  mutation setConversationAsSeen($currentProfileId: ID!, $conversationId: ID!) {
    setConversationAsSeen(currentProfileId: $currentProfileId, conversationId: $conversationId) {
      ...on User {
        id
      }
      ...on Group {
        id
      }
    }
  }
`

export const SET_NOTIFICATION_AS_SEEN = gql`
  mutation setNotificationAsSeen($currentProfileId: ID!, $notificationId: ID!) {
    setNotificationAsSeen(currentProfileId: $currentProfileId, notificationId: $notificationId) {
      seen
      object {
        id
        content
        link
        date
      }
    }
  }
`

export const SET_ALL_NOTIFICATIONS_AS_SEEN = gql`
  mutation setAllNotificationsAsSeen($currentProfileId: ID!) {
    setAllNotificationsAsSeen(currentProfileId: $currentProfileId) {
      seen
      object {
        id
        content
        link
        date
      }
    }
  }

`