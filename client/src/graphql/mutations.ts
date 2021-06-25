import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
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
      messages {body}
    }
}
`