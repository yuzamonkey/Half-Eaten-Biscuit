import React, { useContext, useEffect, useState } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import './Dropdown.css'
import { GET_NOTIFICATIONS } from '../../../../graphql/queries'
import { UserContext } from '../../../UtilityComponents/UserContext'
import { SET_NOTIFICATION_AS_SEEN, SET_ALL_NOTIFICATIONS_AS_SEEN } from '../../../../graphql/mutations'
import { Loading } from '../../../UtilityComponents/UtilityComponents'

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
  const client = useApolloClient()
  const userContext = useContext(UserContext)
  const [notifications, setNotifications] = useState<INotification[]>([])

  //const [getNotifications, { data }] = useLazyQuery(GET_NOTIFICATIONS)
  const notificationsResult = useQuery(GET_NOTIFICATIONS, {
    variables: {
      id: userContext.sessionId
    },
    onCompleted: (data) => {
      console.log("DATA", data)
      const sorted = sortNotifications(data.userOrGroupsNotifications)
      setNotifications(sorted)
    }
  })

  const [setNotificationAsSeen] = useMutation(SET_NOTIFICATION_AS_SEEN)
  const [setAllNotificationsAsSeen] = useMutation(SET_ALL_NOTIFICATIONS_AS_SEEN)

  const sortNotifications = (notifications) => {
    const sorted = [...notifications].sort((n1: any, n2: any) => {
      const n1date = new Date(n1.object.date).getTime()
      const n2date = new Date(n2.object.date).getTime()
      return n2date - n1date
    })
    return sorted
  }

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

  const handleNotificationPress = async (notification) => {
    setShow(false)
    history.push(notification.object.link)
    //if (!notification.seen) {
    const mutationResult = await setNotificationAsSeen({
      variables: {
        currentProfileId: userContext.sessionId,
        notificationId: notification.object.id
      }
    })
    const updatedNotifications = mutationResult.data.setNotificationAsSeen
    setNotifications(sortNotifications(updatedNotifications))
    updateCache(updatedNotifications)
    //}
    // setNotifications(notifications.map(n => {
    //   if (n.object.id === notification.object.id) {
    //     const updated = { ...n, seen: true }
    //     return updated
    //   } else {
    //     return n
    //   }
    // }))
  }

  const updateCache = async (notifications) => {
    client.writeQuery({
      query: GET_NOTIFICATIONS,
      variables: { id: userContext.sessionId },
      data: { userOrGroupsNotifications: notifications }
    })
  }

  const handleSetAll = () => {
    setAllNotificationsAsSeen({
      variables: {
        currentProfileId: userContext.sessionId
      }
    })
    setNotifications(notifications.map(n => { return { ...n, seen: true } }))
  }

  if (notificationsResult.loading) {
    return (
      <div className={show ? "dropdown active" : "dropdown"}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={show ? "dropdown active" : "dropdown"}>
      <div className="title-and-set-all-as-seen-container">
        <h3 className="notifications-title">Notifications</h3>
        {hasUnseenNotifications && <button onClick={() => handleSetAll()} className="set-all-notifications-seen-button">Set all as seen</button>}
      </div>
      {notifications.length === 0
        ? <div>No notifications</div>
        :
        <div>
          <ul>
            {notifications.map(n => <li
              key={n.object.id}
              className="notification-container"
              onClick={() => handleNotificationPress(n)}
            >
              {n.seen ? n.object.content : <b>{n.object.content}</b>}
            </li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default NotificationsDropdown;