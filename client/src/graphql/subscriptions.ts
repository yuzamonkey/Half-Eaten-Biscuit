import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      body
    }
  }
`

export const JOBQUERY_ADDED = gql`
  subscription {
    jobqueryAdded {
      content
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