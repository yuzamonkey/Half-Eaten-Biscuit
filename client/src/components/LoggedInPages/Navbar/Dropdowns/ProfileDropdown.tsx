import React, { useContext, useEffect } from 'react'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from "@apollo/client";
import { useHistory } from 'react-router';

import './Dropdown.css'

import { FIND_USER_OR_GROUP, ME } from '../../../../graphql/queries';
import { SESSION_TOKEN } from '../../../../utils/constants';
import { UserContext } from '../../../UtilityComponents/UserContext';
import { LargeProfileImage, Loading, SmallProfileImage } from '../../../UtilityComponents/UtilityComponents';
import { MESSAGE_ADDED, NOTIFICATION_ADDED } from '../../../../graphql/subscriptions';

interface INotification {
  seen: Boolean
}

interface IConversation {
  hasUnreadMessages: Boolean
}

const ProfileDropdown = ({ show, setShow, setHasUnseen }: any) => {
  const userContext = useContext(UserContext)
  const client = useApolloClient()
  const me = useQuery(ME)
  const [findUserOrGroup, { loading, data }] = useLazyQuery(FIND_USER_OR_GROUP)

  useEffect(() => {
    userContext.sessionId && findUserOrGroup({ variables: { id: userContext.sessionId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.sessionId, me.data])

  const hasMessagesOrNotifications = (notifications: [INotification], conversations: [IConversation]) => {
    if (notifications === undefined || conversations === undefined) {
      return false
    }
    for (let n of notifications) {
      if (!n.seen) {
        return true
      }
    }
    for (let c of conversations) {
      if (c.hasUnreadMessages) {
        return true
      }
    }
    return false;
  }

  useEffect(() => {
    if (me.data) {
      if (userContext.sessionId !== me.data.me.id) {
        if (hasMessagesOrNotifications(me.data.me.notifications, me.data.me.conversations)) {
          setHasUnseen(true)
          return
        }
      }
      for (let group of me.data.me.groups) {
        if (group.id !== userContext.sessionId) {
          if (hasMessagesOrNotifications(group.notifications, group.conversations)) {
            setHasUnseen(true)
            return
          }
        }
      }
      setHasUnseen(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, me.data])

  const history = useHistory()

  useSubscription(MESSAGE_ADDED, {
    variables: {
      userOrGroupIds: userContext.userAndGroupIds
    },
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("SUBS MESSAGE vierasta dataa\n", subscriptionData)
      me.refetch()
      //setHasUnreadMessages(true)
    },
  })

  useSubscription(NOTIFICATION_ADDED, {
    variables: {
      userOrGroupIds: userContext.userAndGroupIds
    },
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("SUBS NOTIFICATION vierasta dataa\n", subscriptionData)
      me.refetch()
      //setHasUnseenNotifications(true)
    },
  })

  if (loading || me.loading) {
    return <div className={show ? "dropdown active" : "dropdown"}>
      <Loading />
    </div>
  }

  const handleSignOut = async  () => {
    await client.resetStore()
    localStorage.clear()
    sessionStorage.clear()
    window.location.assign('/')
  }

  const handleProfileClick = () => {
    history.push(`/profiles/${data.findUserOrGroup.id}`)
    setShow(false)
  }

  const handleSettingsClick = () => {
    history.push('/settings')
    setShow(false)
  }

  const handleProfileChange = (groupId) => {
    sessionStorage.setItem(SESSION_TOKEN, groupId)
    userContext.setSessionId(groupId)
  }

  const handleNewGroupClick = () => {
    history.push('/creategroup')
    setShow(false)
  }

  return (
    <div className={show ? "dropdown active" : "dropdown"}>
      <div className="dropdown-profile" onClick={handleProfileClick}>
        <div>
          <LargeProfileImage image={data.findUserOrGroup.profile.image} />
        </div>
        <h3 className="profile-name">{data.findUserOrGroup.profile.name}</h3>
        <p className="secondary-text">Show profile</p>
      </div>
      {me.data.me.groups.length > 0 &&
        <div className="profile-switch-options">
          <b>Switch profile</b>
          {me.data.me.id !== userContext.sessionId &&
            <div className="dropdown-link profile-switch-profile-link" onClick={() => handleProfileChange(me.data.me.id)}>
              <div>
                <SmallProfileImage image={me.data.me.profile.image} />
              </div>
              <p>{me.data.me.profile.name}</p>
              {hasMessagesOrNotifications(me.data.me.notifications, me.data.me.conversations) ? <div className="alert-dot">•</div> : <div />}
            </div>
          }
          {me.data.me.groups.map(group =>
            group.id !== userContext.sessionId &&
            <div
              className="dropdown-link profile-switch-profile-link"
              onClick={() => handleProfileChange(group.id)}
              key={group.id}>
              <div>
                <SmallProfileImage image={group.profile.image} />
              </div>
              <p>{group.profile.name}</p>
              {hasMessagesOrNotifications(group.notifications, group.conversations) ? <div className="alert-dot">•</div> : <div />}
            </div>
          )}
        </div>
      }
      <div className="dropdown-link" onClick={handleNewGroupClick}>New group +</div>
      <div className="dropdown-link" onClick={handleSettingsClick}>Settings</div>
      <div className="dropdown-link" onClick={handleSignOut}>Sign out</div>
    </div>
  )
}

export default ProfileDropdown
