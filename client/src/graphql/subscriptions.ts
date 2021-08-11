import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      body
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