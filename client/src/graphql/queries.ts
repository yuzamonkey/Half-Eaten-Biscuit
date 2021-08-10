import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      id
      username
      jobQueries {
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

export const GET_NOTIFICATIONS = gql`
  query getNotifications($id: ID!) {
    findUserOrGroup(id: $id) {
        ... on User {
        notifications {
          id
          content
          link
        }
      }
      ... on Group {
        notifications {
          id
          content
          link
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
          image
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

export const MY_ID = gql`
  query myId {
    me {
      id,
      username
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
                username
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

export const ALL_JOBQUERIES = gql`
  query allJobqueries {
    allJobqueries {
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
          ...on SkillCategory {
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

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      username 
      profile {
        image
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

export const ALL_SKILL_CATEGORIES = gql`
  query allSkillCategories {
    allSkillCategories {
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

export const ALL_GROUP_SKILL_CATEGORIES = gql`
  query allGroupSkillCategories {
    allGroupSkillCategories {
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
          about
          image
          skills {
            id
            name
            profession
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
          groupTypes {
            id
            name
          }
        }
      }
    }
  }
`
