import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      id
      username
      jobAds {
        id, 
        content, 
        postedOn,
        visible
      },
      groups {
        id
        profile {
          name
        }
      },
      profile {
        categories {
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
        name
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

export const GET_NOTIFICATIONS = gql`
  query getNotifications($id: ID!) {
    findUserOrGroup(id: $id) {
        ... on User {
        notifications {
          seen
          object {
            id
            content
            link
            date
          }
        }
      }
      ... on Group {
        notifications {
          seen
          object {
            id
            content
            link
            date
          }
        }
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
        id
        kind
        username
        profile {
          about,
          image,
          firstName,
          name
        }
      }
      ... on Group {
        id
        kind
        users {
          id
          username
        }
        profile {
          name,
          image
        }
      }
    }
  }
`

export const MY_CONVERSATIONS_PARTICIPANTS_LIST = gql`
  query myConversationsParticipantsList {
      me {
        username
        conversations {
          id,
          participants {
            object {
            ...on User {
              id,
              kind,
              username
            }
            ...on Group {
              id,
              kind,
              profile {
                name
              }
            }
          }
        }  
      }
    }
  }
`

export const CONVERSATION_PARTICIPANTS_BY_SESSION_ID = gql`
  query conversationParticipantsById ($id: ID!) {
    findUserOrGroup(id: $id) {
      ...on User {
        username
        conversations {
          id
          participants {
            object {
              ...on User {
                id
                kind
                profile {
                  name
                }
              }
              ...on Group {
                id
                kind
                profile {
                  name
                }
              }
            }
          }
        }
      }
      ...on Group {
        profile {
          name
        }
        conversations {
          id
          participants {
            kind
            object {
              ...on User {
                id
                kind
                username
                profile {
                  name
                }
              }
              ...on Group {
                id
                kind
                profile {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

export const JOBADS_SENT_BY_SESSION_ID = gql`
  query jobAdsBySessionId($id: ID!) {
    findUserOrGroup(id: $id) {
        ... on User {
        jobAds {
          id
          content
          visible
        }
      }
      ... on Group {
        jobAds {
          id
          content
          visible
        }
      }
    }
  }
`

export const FIND_CONVERSATION = gql`
  query findConversation($id: ID!) {
    findConversation(id: $id) {
      id
      participants {
        object {
          ... on User {
            id
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
      messages {
        id
        body
        time
        sender {
          object {
            ...on User {
              id 
              username
              profile {
                image
              }
            }
            ...on Group {
              id
              profile {
                name
                image  
              }
            }
          }
        }
      } 
    }
  }
`

export const FIND_JOBAD = gql`
  query findJobAd($id: ID!) {
    findJobAd(id: $id) {
      id,
      content,
      postedOn,
      startSchedule,
      endSchedule,
      location,
      salary,
      postedBy {
        kind 
        object {
          ...on User {
            username
            profile {
              image
            }
          }
          ...on Group {
            profile {
              name
              image
            }
          }
        }
      }
      wantedCategories {
        object {
          ...on UserCategory {
            name
          }
          ... on GroupCategory {
            name
          }
        }
      }
    }
  }
`

export const ALL_JOBADS = gql`
  query allJobAds {
    allJobAds {
      id,
      content,
      postedOn,
      startSchedule,
      endSchedule,
      location,
      salary,
      postedBy {
        kind 
        object {
          ...on User {
            profile {
              firstName
              name
              image
            }
          }
          ...on Group {
            profile {
              name
              image
            }
          }
        }
      }
      wantedCategories {
        object {
          ...on UserCategory {
            name
            profession
          }
          ... on GroupCategory {
            name
          }
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
      profile {
        image
        name
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
      categories {
        id
        name
      }
      image
    }
  }
`

export const ALL_USER_CATEGORIES = gql`
  query allUserCategories {
    allUserCategories {
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

export const ALL_GROUP_CATEGORIES = gql`
  query allGroupCategories {
    allGroupCategories {
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

export const ALL_USERS_AND_GROUPS = gql`
  query allUsersAndGroups {
    allUsersAndGroups {
      ...on User {
        id
        kind
        username
        profile {
          name
          about
          image
          categories {
            id
            name
            profession
            parent {
              name
            }
          }
        }
      }
      ...on Group {
        id
        kind
        profile {
          name
          image
          about
          categories {
            id
            name
            parent {
              name
            }
          }
        }
      }
    }
  }
`
