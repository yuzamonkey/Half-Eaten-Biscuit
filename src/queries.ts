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

export const ME = gql`
  query {
    me {
      username
      jobQueries {
        content, date
      }
    }
  }
`

export const CONVERSATION_INFOS = gql`
  query {
    me {
      conversations {
        id,
        users {
          username
          }
      }
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

export const ALL_QUERIES = gql`
  query {
    allQueries  {
      content
      date
      user {
        username
      }
    }
  }
`

export const FIND_USER = gql`
  query findUser($id: ID!){
    findUser (id: $id) {
      username
    }
  }
`

export const ALL_USERS = gql`
  query {
    allUsers {
      id
      username 
      jobQueries {
        content
      }
    }
  }
`
