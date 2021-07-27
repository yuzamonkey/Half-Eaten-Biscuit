import React from 'react'
import { useQuery } from '@apollo/client';
import { NavLink } from "react-router-dom";
import { MY_CONVERSATIONS_PARTICIPANTS_LIST } from '../../../../graphql/queries';

import './MessageNavigation.css'
import { Searchbar } from '../../../UtilityComponents/UtilityComponents';

const MessageNavigation = ({ setShowContacts }: any) => {
  const result = useQuery(MY_CONVERSATIONS_PARTICIPANTS_LIST)

  if (result.loading) {
    return <div>Loading...</div>
  }
  console.log("RESULT", result)
  const conversations = result.data.me.conversations

  return (
    <nav className="msg-navigation">
      <div className="msg-nav-container">
        <div className="messages-filter-container">
          <Searchbar />
        </div>
        <ul className="msg-nav-menu">
          {conversations.map(conversation => {
            const usernames = conversation.users.map(user =>
              user.username !== result.data.me.username && user.username
            )
            const linkTo = `/messages/${conversation.id}`
            return (
              <li className="msg-nav-item" key={conversation.id}>
                <NavLink exact to={linkTo} activeClassName="msg-active" className="msg-nav-links" onClick={() => setShowContacts(false)}>
                  {usernames}
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