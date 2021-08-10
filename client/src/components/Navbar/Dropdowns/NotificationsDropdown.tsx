import React from 'react'
import { useSubscription } from '@apollo/client'

import './Dropdown.css'
import { JOBQUERY_ADDED } from '../../../graphql/subscriptions'

const NotificationsDropdown = ({ show, setShow }: any) => {

  useSubscription(JOBQUERY_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("SUBSCRIPTION DATA ON NOTIFICATIONS DROPDOWN:\n", subscriptionData)
    },
  })

  if (!show) {
    return null
  }

  return (
    <div className="dropdown">
      <h3 className="notifications-title">Notifications</h3>
    </div>
  )
}

export default NotificationsDropdown;