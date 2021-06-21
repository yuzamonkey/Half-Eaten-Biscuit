import { gql } from '@apollo/client';

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

export const MY_ID = gql`
  query {
    me {
      id
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

export const FIND_CONVERSATION = gql`
  query ($id: ID!) {
    findConversation(id: $id) {
      id, 
      users {
        id,
        username
      },
      messages {
        id
        sender {
          id
        }
        body 
      } 
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
