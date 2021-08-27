import { gql } from '@apollo/client';

// export const MESSAGE_ADDED = gql`
//   subscription {
//     messageAdded {
//       id
//     }
//   }
// `
export const MESSAGE_ADDED = gql`
  subscription ($conversationIds: [ID]!){
    messageAdded(conversationIds: $conversationIds) {
      id
    }
  }
`

export const NOTIFICATION_ADDED = gql`
  subscription {
    notificationAdded {
      content
    }
  }
`