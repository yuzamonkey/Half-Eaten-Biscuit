import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'
import NotificationsDropdown from './Dropdowns/NotificationsDropdown'
import ProfileOptionsDropdown from './Dropdowns/ProfileDropdown'
import { UserContext } from '../UtilityComponents/UserContext';
import { useQuery } from '@apollo/client';
import { FIND_USER_OR_GROUP } from '../../graphql/queries';

const Navbar = () => {
  const userContext = useContext(UserContext)
  const currentUserNameResult = useQuery(FIND_USER_OR_GROUP, {variables: {id: userContext.sessionId}})

  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotifications] = useState(false)
  const [showProfileOptionsDropdown, setShowProfileOptionsDropdown] = useState(false)

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
              <NavLink exact to="/jobmarket/queries" activeClassName="active" className="nav-links" onClick={handleClick}>
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
                <i className="fa fa-comment"></i>
              </NavLink>
            </li>

            {/* Dropdowns */}
            <li className="nav-item dropdown-container">
              <div
                onClick={handleNotificationDrop}
                tabIndex={0}
                className="nav-links">
                {/* Notifications ▼ */}
                <i className="fa fa-bell"> ▿</i>
              </div>
              <NotificationsDropdown
                show={showNotification}
                setShow={setShowNotifications} />
            </li>

            <li className="nav-item dropdown-container">
              <div
                onClick={handleProfileDrop}
                tabIndex={0}
                className="nav-links">
                <i className="fa fa-user"> ▿ </i>
                <span className="nav-current-session-name"> {currentUserNameResult.data && (currentUserNameResult.data.findUserOrGroup.profile.firstName || currentUserNameResult.data.findUserOrGroup.profile.name)}</span>
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
