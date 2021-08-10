import React, { useContext, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import './Dropdown.css'
import { JOBQUERY_ADDED } from '../../../graphql/subscriptions'
import { GET_NOTIFICATIONS } from '../../../graphql/queries'
import { UserContext } from '../../UtilityComponents/UserContext'

interface INotification {
  content: string
}

const NotificationsDropdown = ({ show, setShow }: any) => {
  const userContext = useContext(UserContext)
  const [notifications, setNotifications] = useState<INotification[]>([{ content: "buubdaduu" }])

  const notificationsResult = useQuery(GET_NOTIFICATIONS, {
    variables: { id: userContext.sessionId },
    onCompleted: (data) => {
      setNotifications(notifications.concat(data.findUserOrGroup.notifications))
    }
  })

  console.log("NOTIFICATIONS RESULT", notificationsResult)

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
      {notifications.map(n => {
        return (
          <div>
            {n.content}
          </div>
        )
      })}
    </div>
  )
}

export default NotificationsDropdown;