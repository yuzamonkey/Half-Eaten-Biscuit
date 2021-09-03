import React from 'react';
import { NavLink } from "react-router-dom";
import '../../Settings/Settings.css'

const SettingsNavigation = () => {
  return (
    <nav className="settings-navigation">
        <div className="settings-nav-container">
          <ul className="settings-nav-menu">
            <li className="settings-nav-item">
              <NavLink exact to="/settings/credentials/" activeClassName="settings-active" className="settings-nav-links"> 
                <div className="settings-nav-filler-div"/>
                <div className="settings-nav-name">Credentials</div>
                <div className="settings-nav-icon"><i className="fa fa-unlock-alt"></i></div>
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/profile/" activeClassName="settings-active" className="settings-nav-links"> 
                <div className="settings-nav-filler-div"/>
                <div className="settings-nav-name">Profile</div>
                <div className="settings-nav-icon"><i className="fa fa-user"></i></div>
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/groups/" activeClassName="settings-active" className="settings-nav-links"> 
                <div className="settings-nav-filler-div"/>
                <div className="settings-nav-name">Groups</div>
                <div className="settings-nav-icon"><i className="fa fa-users"></i></div>
              </NavLink>
            </li>
            <li className="settings-nav-item">
              <NavLink exact to="/settings/deleteuser/" activeClassName="settings-active" className="settings-nav-links"> 
                <div className="settings-nav-filler-div"/>
                <div className="settings-nav-name">Delete</div>
                <div className="settings-nav-icon"><i className="fa fa-minus-circle"></i></div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default SettingsNavigation;