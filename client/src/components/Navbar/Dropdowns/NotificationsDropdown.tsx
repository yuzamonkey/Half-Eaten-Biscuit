import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client'

import './Dropdown.css'
import { JOBQUERY_ADDED } from '../../../graphql/subscriptions'
import { GET_NOTIFICATIONS } from '../../../graphql/queries'
import { UserContext } from '../../UtilityComponents/UserContext'

interface INotification {
  id: string,
  content: string,
  link: string
}

const NotificationsDropdown = ({ show, setShow }: any) => {
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
      {notifications.length !== 0
        ?
        notifications.map(n => {
          return (
            <div key={n.id}>
              <ul>
                <li>•{n.link}</li>
                <li>•{n.content}</li>
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