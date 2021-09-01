import React from 'react';
import { NavLink } from "react-router-dom";
import '../../Jobmarket/Jobmarket.css'

const SettingsNavigation = () => {
  return (
    <nav className="settings-navigation">
        <div className="settings-nav-container">
          <ul className="settings-nav-menu">
            <li className="settings-nav-item">
              <NavLink exact to="/settings/credentials/" activeClassName="settings-active" className="settings-nav-links"> 
                Credentials
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/profile/" activeClassName="settings-active" className="settings-nav-links"> 
                Profile
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/groups/" activeClassName="settings-active" className="settings-nav-links"> 
                Groups
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/deleteuser/" activeClassName="settings-active" className="settings-nav-links"> 
                Delete
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default SettingsNavigation;