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
export const CREATE_QUERY = gql`
  mutation createQuery($content: String!) {
    createQuery(content: $content) {
      content
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