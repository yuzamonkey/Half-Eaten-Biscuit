import { gql } from '@apollo/client';

// export const MESSAGE_ADDED = gql`
//   subscription {
//     messageAdded {
//       id
//     }
//   }
// `
export const MESSAGE_ADDED = gql`
  subscription ($userOrGroupId: ID!){
    messageAdded(userOrGroupId: $userOrGroupId) {
      id
    }
  }
`

export const NOTIFICATION_ADDED = gql`
  subscription ($userOrGroupId: ID!){
    notificationAdded(userOrGroupId: $userOrGroupId) {
      content
    }
  }
`