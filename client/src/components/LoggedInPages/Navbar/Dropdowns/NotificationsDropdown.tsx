import React, { useContext, useEffect } from 'react'
import { useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import './Dropdown.css'
import { GET_NOTIFICATIONS } from '../../../../graphql/queries'
import { UserContext } from '../../../UtilityComponents/UserContext'
import { SET_NOTIFICATION_AS_SEEN, SET_ALL_NOTIFICATIONS_AS_SEEN } from '../../../../graphql/mutations'
import { Loading } from '../../../UtilityComponents/UtilityComponents'
import { NOTIFICATION_ADDED } from '../../../../graphql/subscriptions'

// interface INotification {
//   id: string,
//   seen: boolean,
//   object: {
//     content: string,
//     link: string,
//     date: string,
//     id: string
//   }
// }

const NotificationsDropdown = ({ show, setShow, hasUnseenNotifications, setHasUnseenNotifications }: any) => {
  const history = useHistory()
  const client = useApolloClient()
  const userContext = useContext(UserContext)
  const notificationsResult = useQuery(GET_NOTIFICATIONS, {
    variables: {
      id: userContext.sessionId
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
    if (notificationsResult.data) {
      let hasUnseenNotifications = false
      const notifications = notificationsResult.data.userOrGroupsNotifications
      for (let n of notifications) {
        if (!n.seen) {
          hasUnseenNotifications = true
          break
        }
      }
      setHasUnseenNotifications(hasUnseenNotifications)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsResult.data])

  useSubscription(NOTIFICATION_ADDED, {
    variables: {
      userOrGroupIds: [userContext.sessionId]
    },
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("SUBSCRIPTION NOTIFICATION ADDED omaa dataa\n", subscriptionData)
      notificationsResult.refetch()
    },
  })

  const updateCache = async (notifications) => {
    client.writeQuery({
      query: GET_NOTIFICATIONS,
      variables: { id: userContext.sessionId },
      data: { userOrGroupsNotifications: notifications }
    })
  }

  const handleNotificationPress = async (notification) => {
    setShow(false)
    history.push(notification.object.link)
    if (!notification.seen) {
      const mutationResult = await setNotificationAsSeen({
        variables: {
          currentProfileId: userContext.sessionId,
          notificationId: notification.object.id
        }
      })
      const updatedNotifications = mutationResult.data.setNotificationAsSeen
      updateCache(updatedNotifications)
    }
  }

  const handleSetAll = async () => {
    setShow(false)
    const mutationResult = await setAllNotificationsAsSeen({
      variables: {
        currentProfileId: userContext.sessionId
      }
    })
    const updatedNotifications = mutationResult.data.setAllNotificationsAsSeen
    updateCache(updatedNotifications)
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
        {hasUnseenNotifications &&
          <div onClick={() => handleSetAll()} className="set-all-notifications-seen-button">Set all as seen</div>
        }
      </div>
      {notificationsResult.data.userOrGroupsNotifications.length === 0
        ? <div>No notifications</div>
        :
        <div>
          <ul>
            {sortNotifications(notificationsResult.data.userOrGroupsNotifications).map(n => <li
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