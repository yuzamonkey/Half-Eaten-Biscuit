import React from 'react'
import { NavLink } from "react-router-dom";

import './MessageNavigation.css'

const conversations = [
  {
    id: 1,
    users: [
      {
        name: "John Doe"
      }
    ]
  },
  {
    id: 2,
    users: [
      {
        name: "Bob Bobbanson"
      },
      {
        name: "Claus Clauson"
      }
    ]
  },
]

const MessageNavigation = () => {
  return (
    <nav className="msg-navigation">
      <div className="msg-nav-container">
        <ul className="msg-nav-menu">
          {conversations.map(conversation => {
            const names = conversation.users.reduce((theList, theUser) => theList + theUser.name + ", ", "")
            const linkTo = `../messages/${conversation.id}`
            return (
              <li className="msg-nav-item">
                <NavLink exact to={linkTo} activeClassName="msg-active" className="msg-nav-links">
                  {names}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default MessageNavigation;