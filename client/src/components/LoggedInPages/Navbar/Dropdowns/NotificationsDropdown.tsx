import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import './Dropdown.css'
import { GET_NOTIFICATIONS } from '../../../../graphql/queries'
import { UserContext } from '../../../UtilityComponents/UserContext'
import { SET_NOTIFICATION_AS_SEEN, SET_ALL_NOTIFICATIONS_AS_SEEN } from '../../../../graphql/mutations'

interface INotification {
  id: string,
  seen: boolean,
  object: {
    content: string,
    link: string,
    date: string,
    id: string
  }
}

const NotificationsDropdown = ({ show, setShow, hasUnseenNotifications, setHasUnseenNotifications }: any) => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [getNotifications, { data }] = useLazyQuery(GET_NOTIFICATIONS)
  const [setNotificationAsSeen] = useMutation(SET_NOTIFICATION_AS_SEEN)
  const [setAllNotificationsAsSeen] = useMutation(SET_ALL_NOTIFICATIONS_AS_SEEN)

  useEffect(() => {
    getNotifications({
      variables: { id: userContext.sessionId },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.sessionId])

  useEffect(() => {
    if (data) {
      const sorted = [...data.findUserOrGroup.notifications].sort((n1: any, n2: any) => {
        const n1date = new Date(n1.date).getTime()
        const n2date = new Date(n2.date).getTime()
        return n2date - n1date
      })
      setNotifications(sorted)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [data])

  useEffect(() => {
    if (notifications) {
      let hasUnseenNotifications = false
      for (let n of notifications) {
        if (!n.seen) {
          hasUnseenNotifications = true
          break
        }
      }
      setHasUnseenNotifications(hasUnseenNotifications)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  // useSubscription(NOTIFICATION_ADDED, {
  //   onSubscriptionData: async ({ subscriptionData }) => {
  //     // below works, but not optimal
  //     client.reFetchObservableQueries()
  //   },
  // })


  const handleNotificationPress = (notification) => {
    setShow(false)
    setNotificationAsSeen({
      variables: {
        currentProfileId: userContext.sessionId,
        notificationId: notification.object.id
      }
    })
    setNotifications(notifications.map(n => {
      if (n.object.id === notification.object.id) {
        const updated = { ...n, seen: true }
        return updated
      } else {
        return n
      }
    }))
    history.push(notification.object.link)
  }

  const handleSetAll = () => {
    setAllNotificationsAsSeen({
      variables: {
        currentProfileId: userContext.sessionId
      }
    })
    setNotifications(notifications.map(n => {return { ...n, seen: true }}))
  }

return (
  <div className={show ? "dropdown active" : "dropdown"}>
    <h3 className="notifications-title">Notifications</h3>
    {notifications.length === 0
      ?
      <div>No notifications</div>
      :
      <div>
        {hasUnseenNotifications && <button onClick={() => handleSetAll()}>Set all as seen</button>}
        {notifications.map(n => {
          return (
            <div key={n.id}>
              <ul>
                <li className="notification-container" onClick={() => handleNotificationPress(n)}>{n.seen ? n.object.content : <b>{n.object.content}</b>}</li>
              </ul>
            </div>
          )
        })
        }
      </div>
    }
  </div>
)
}

export default NotificationsDropdown;