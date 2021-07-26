import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      id
      username
      jobQueries {
        id, 
        content, 
        date,
        visible
      },
      groups {
        id
        profile {
          name
        }
      },
      profile {
        skills {
          id
          name
          parent {
            name
          }
          children {
            name
          }
        }
        about
        image
        isEditedByUser
      }
    }
  }
`

export const FIND_USER = gql`
  query findUser($id: ID!) {
    findUser (id: $id) {
      username,
      profile {
        about,
        image
      }
    }
  }
`

export const FIND_GROUP = gql`
  query findGroup($id: ID!) {
    findGroup(id: $id) {
      name
    }
  }
`

export const FIND_USER_OR_GROUP = gql`
  query findUserOrGroup($id: ID!) {
    findUserOrGroup(id: $id) {
        ... on User {
        id,
        username
      }
      ... on Group {
        id,
        profile {
          name
        }
      }
    }
  }
`

export const MY_ID = gql`
  query myId {
    me {
      id,
      username
    }
  }
`

export const CONVERSATION_INFOS = gql`
  query conversationInfos {
    me {
      username
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
  query findConversation($id: ID!) {
    findConversation(id: $id) {
      id, 
      users {
        id,
        username
        conversations {
          id
        }
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

export const ALL_JOBQUERIES = gql`
  query allJobqueries{
    allJobqueries {
      id
      content
      date
      user {
        username
        profile {
          image
        }
      }
    }
  }
`

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      username 
      jobQueries {
        content
      }
      profile {
        image,
        skills {
          name
        }
      }
    }
  }
`

export const ALL_USER_PROFILES = gql`
  query allUserProfiles {
    allUserProfiles {
      id
      user {
        id
        username
        }
      about
      skills {
        id
        name
      }
      image
    }
  }
`

export const ALL_CATEGORIES = gql`
  query allCategories {
    allCategories {
      id
      name
      parent {
        name
      }
      children {
        name
      }
    }
  }
`
