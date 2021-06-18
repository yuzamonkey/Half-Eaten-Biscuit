import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'
import NotificationsDropdown from './Dropdowns/NotificationsDropdown'
import ProfileOptionsDropdown from './Dropdowns/ProfileOptionsDropdown'


const Navbar = () => {
  const [click, setClick] = useState(false);
  const [showNotification, setShowNotifications] = useState(false)
  const [showProfileOptionsDropdown, setShowProfileOptionsDropdown] = useState(false)

  const handleClick = () => {
    setClick(!click);
    setShowNotifications(false)
    setShowProfileOptionsDropdown(false)
  }

  const handleNotificationDrop = () => {
    setShowProfileOptionsDropdown(false)
    setShowNotifications(!showNotification)
  };

  const handleProfileDrop = () => {
    setShowNotifications(false)
    setShowProfileOptionsDropdown(!showProfileOptionsDropdown)
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            PartialCookie <i className="fas fa-cookie-bite"></i>
          </NavLink>

          <ul className="nav-menu constant-links">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/jobmarket/queries" activeClassName="active" className="nav-links">
                Jobmarket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/profiles" activeClassName="active" className="nav-links">
                Profiles
              </NavLink>
            </li>
          </ul>

          <ul className={click ? "nav-menu hidden-links active" : "nav-menu hidden-links"} >
            <li className="nav-item">
              <NavLink exact to="/messages" activeClassName="active" className="nav-links">
                Messages
              </NavLink>
            </li>

            {/* Dropdowns */}
            <div
              onClick={handleNotificationDrop}
              // onBlur={handleNotificationDrop}
              // onFocus={handleNotificationDrop}
              tabIndex={0}
              className="dropdown-container">
              <p className="nav-links">Notifications ∆</p>
              <div className={showNotification ? "dropdown notifications active" : "notifications"}>
                <NotificationsDropdown />
              </div>
            </div>


            <div
              onClick={handleProfileDrop}
              // onBlur={handleProfileDrop}
              // onFocus={handleProfileDrop}
              tabIndex={0}
              className="dropdown-container">
              <p className="nav-links">Me ∆</p>
              <div className={showProfileOptionsDropdown ? "dropdown profile-options active" : "profile-options"}>
                <ProfileOptionsDropdown />
              </div>
            </div>
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times-circle" : "fas fa-bars"}></i>
          </div>
        </div>

      </nav>
    </>
  );
}

export default Navbar;
