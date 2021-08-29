import { gql } from '@apollo/client';

// export const MESSAGE_ADDED = gql`
//   subscription {
//     messageAdded {
//       id
//     }
//   }
// `
export const MESSAGE_ADDED = gql`
  subscription ($userOrGroupIds: [ID]!){
    messageAdded(userOrGroupIds: $userOrGroupIds) {
      id
    }
  }
`

export const NOTIFICATION_ADDED = gql`
  subscription ($userOrGroupIds: [ID]!){
    notificationAdded(userOrGroupIds: $userOrGroupIds) {
      content
    }
  }
`