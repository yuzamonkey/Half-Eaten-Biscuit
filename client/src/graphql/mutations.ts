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
  mutation createGroup($name: String!, $users: [ID!]!, $about: String!, $image: String!, $skills: [ID]!){
    createGroup(name: $name, users: $users, about: $about, image: $image, skills: $skills) {
      id
      kind
    }
  }
`

export const CREATE_USER_PROFILE = gql`
  mutation createUserProfile($skills: [ID]!, $about: String!, $image: String){
    createUserProfile(skills: $skills, about: $about, image: $image) {
      id
      about
    }
  }
`