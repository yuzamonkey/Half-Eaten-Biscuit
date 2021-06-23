import React from 'react';
import { NavLink } from "react-router-dom";
import '../Jobmarket.css'

const JobmarketNavigation = () => {
  return (
    <nav className="job-navigation">
        <div className="job-nav-container">
          <ul className="job-nav-menu">
            <li className="job-nav-item">
              <NavLink exact to="./queries" activeClassName="job-active" className="job-nav-links"> 
                Queries
              </NavLink>
            </li>
            <li className="job-nav-item">
              <NavLink exact to="./sendquery" activeClassName="job-active" className="job-nav-links"> 
                Send query
              </NavLink>
            </li>
            <li className="job-nav-item">
              <NavLink exact to="./myqueries" activeClassName="job-active" className="job-nav-links"> 
                My queries
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default JobmarketNavigation;