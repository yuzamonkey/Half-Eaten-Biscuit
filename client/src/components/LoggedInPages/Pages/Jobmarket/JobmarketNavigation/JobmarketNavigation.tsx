import React from 'react';
import { NavLink } from "react-router-dom";
import '../Jobmarket.css'

const JobmarketNavigation = () => {
  return (
    <nav className="job-navigation">
        <div className="job-nav-container">
          <ul className="job-nav-menu">
            <li className="job-nav-item">
              <NavLink exact to="/jobmarket/jobads/" activeClassName="job-active" className="job-nav-links"> 
                Job ads
              </NavLink>
            </li>
            <li className="job-nav-item">
              <NavLink exact to="/jobmarket/findartists/" activeClassName="job-active" className="job-nav-links"> 
                Find artists
              </NavLink>
            </li>
            <li className="job-nav-item">
              <NavLink exact to="/jobmarket/sendjobad/" activeClassName="job-active" className="job-nav-links"> 
                Send ad
              </NavLink>
            </li>
            <li className="job-nav-item">
              <NavLink exact to="/jobmarket/myads/" activeClassName="job-active" className="job-nav-links"> 
                My ads
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default JobmarketNavigation;