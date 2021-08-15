import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

import './Dropdown.css'
import { NOTIFICATION_ADDED } from '../../../graphql/subscriptions'
import { GET_NOTIFICATIONS } from '../../../graphql/queries'
import { UserContext } from '../../UtilityComponents/UserContext'

interface INotification {
  id: string,
  content: string,
  link: string
}

const NotificationsDropdown = ({ show, setShow }: any) => {
  const history = useHistory()
  const client = useApolloClient()
  const userContext = useContext(UserContext)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [getNotifications, { data }] = useLazyQuery(GET_NOTIFICATIONS)

  useEffect(() => {
    getNotifications({
      variables: { id: userContext.sessionId },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.sessionId])

  useEffect(() => {
    setNotifications(data?.findUserOrGroup.notifications)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useSubscription(NOTIFICATION_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      // below works, but not optimal
      client.reFetchObservableQueries()
    },
  })

  if (!show) {
    return null
  }

  const handleNotificationPress = (notification) => {
    console.log(notification)
    history.push(notification.link)
  }

  return (
    <div className="dropdown">
      <h3 className="notifications-title">Notifications</h3>
      {notifications.length !== 0
        ?
        notifications.map(n => {
          return (
            <div key={n.id}>
              <ul>
                <li className="notification-container" onClick={() => handleNotificationPress(n)}>{n.content}</li>
              </ul>
            </div>
          )
        })
        :
        <div>No notifications</div>
      }
    </div>
  )
}

export default NotificationsDropdown;