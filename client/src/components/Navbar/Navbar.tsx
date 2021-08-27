import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../UtilityComponents/UserContext';
import { useQuery, useSubscription } from '@apollo/client';

import './Navbar.css'
import { FIND_USER_OR_GROUP, GET_CONVERSATION_SEEN_BY_SESSION_ID } from '../../graphql/queries';
import NotificationsDropdown from './Dropdowns/NotificationsDropdown'
import ProfileOptionsDropdown from './Dropdowns/ProfileDropdown'
import { SmallProfileImage } from '../UtilityComponents/UtilityComponents';
import { MESSAGE_ADDED } from '../../graphql/subscriptions';

const Navbar = () => {
  const userContext = useContext(UserContext)
  const currentProfileResult = useQuery(FIND_USER_OR_GROUP, { variables: { id: userContext.sessionId } })
  const messageInfo = useQuery(GET_CONVERSATION_SEEN_BY_SESSION_ID, { variables: { id: userContext.sessionId }, })

  useEffect(() => {
    if (messageInfo.data) {
      let hasNewMessages = false
      for (let c of messageInfo.data.findUserOrGroup.conversations) {
        if (c.hasUnreadMessages) {
          hasNewMessages = true
          break;
        }
      }
      setHasUnreadMessages(hasNewMessages)
    }
  }, [messageInfo.data])


  useSubscription(MESSAGE_ADDED, {
    variables: {
      userOrGroupId: userContext.sessionId
    },
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("SUBSCRIPTION DATA", subscriptionData)
      setHasUnreadMessages(true)
    },
  })

  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotifications] = useState(false)
  const [showProfileOptionsDropdown, setShowProfileOptionsDropdown] = useState(false)

  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  const handleClick = () => {
    setShowMenu(!showMenu);
    setShowNotifications(false)
    setShowProfileOptionsDropdown(false)
  }

  const handleNotificationDrop = () => {
    setShowProfileOptionsDropdown(false)
    setShowNotifications(!showNotification)
    setShowMenu(false)
  };

  const handleProfileDrop = () => {
    setShowNotifications(false)
    setShowProfileOptionsDropdown(!showProfileOptionsDropdown)
    setShowMenu(false)
  };

  const handleMessagesView = () => {
    setShowMenu(false)
    setShowNotifications(false)
    setShowProfileOptionsDropdown(false)
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          <div className="nav-icon nav-menu" onClick={handleClick}>
            <i className={showMenu ? "fas fa-arrow-left" : "fas fa-bars"}></i>
          </div>

          <NavLink to="/" className="nav-logo nav-menu" onClick={() => window.location.assign('/')}>
            HalfEatenBiscuit <i className="fas fa-cookie-bite"></i>
          </NavLink>

          <ul className={showMenu ? "nav-menu hidden-links active" : "nav-menu hidden-links"} >
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/jobmarket/jobads" activeClassName="active" className="nav-links" onClick={handleClick}>
                Jobmarket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/profiles" activeClassName="active" className="nav-links" onClick={handleClick}>
                Profiles
              </NavLink>
            </li>
          </ul>

          <ul className="nav-menu constant-links">
            <li className="nav-item">
              <NavLink exact to="/messages" activeClassName="active" className="nav-links" onClick={handleMessagesView}>
                {/* Messages */}
                <i className={hasUnreadMessages ? "fa fa-comment new-messages" : "fa fa-comment"}></i>
              </NavLink>
            </li>

            {/* Dropdowns */}
            <li className="nav-item dropdown-container">
              <div
                onClick={handleNotificationDrop}
                tabIndex={0}
                className="nav-links">
                {/* Notifications ▼ */}
                <i className={hasUnseenNotifications ? "fa fa-bell new-notifications" : "fa fa-bell"}> ▿</i>
              </div>
              <NotificationsDropdown
                show={showNotification}
                setShow={setShowNotifications}
                setHasUnseenNotifications={setHasUnseenNotifications}
              />
            </li>

            <li className="nav-item dropdown-container">
              <div
                onClick={handleProfileDrop}
                tabIndex={0}
                className="nav-links">
                {/* <i className="fa fa-user"> ▿ </i> */}
                <span className="nav-current-session-name">
                  {currentProfileResult.data &&
                    (currentProfileResult.data.findUserOrGroup.profile.firstName ||
                      currentProfileResult.data.findUserOrGroup.profile.name)}
                </span>
                &nbsp;
                {currentProfileResult.data &&
                  <SmallProfileImage
                    image={currentProfileResult.data.findUserOrGroup.profile.image}
                  />}
                &nbsp;
                ▿
              </div>
              <ProfileOptionsDropdown
                show={showProfileOptionsDropdown}
                setShow={setShowProfileOptionsDropdown}
              />
            </li>
          </ul>
        </div>

      </nav>
    </>
  );
}

export default Navbar;
