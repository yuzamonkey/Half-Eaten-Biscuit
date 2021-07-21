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
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
}
`
export const CREATE_JOBQUERY = gql`
  mutation createJobquery($content: String!) {
    createJobquery(content: $content) {
      content
    }
}
`

export const NEW_CONVERSATION = gql`
  mutation newConversation($receiverId: ID!) {
    createConversation(receiverId: $receiverId) {
      id
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation sendMessage($id: ID!, $body: String!) {
    sendMessage(conversationId: $id, body: $body) {
      id, 
      body
    }
}
`

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $users: [ID!]!){
    createGroup(name: $name, users: $users) {
      name
    }
  }
`

export const CREATE_USER_PROFILE = gql`
  mutation createUserProfile($skills: [ID]!, $about: String!, $image: String){
    createUserProfile(skills: $skills, about: $about, image: $image) {
      about
    }
  }
`