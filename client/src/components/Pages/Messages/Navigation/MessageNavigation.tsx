import React from 'react'
import { useQuery } from '@apollo/client';
import { NavLink } from "react-router-dom";
import { CONVERSATION_INFOS } from '../../../../graphql/queries';

import './MessageNavigation.css'
import { Searchbar } from '../../../UtilityComponents/UtilityComponents';

const MessageNavigation = ({ setShowContacts }: any) => {
  const result = useQuery(CONVERSATION_INFOS)

  if (result.loading) {
    return <div>Loading...</div>
  }
  const conversations = result.data.me.conversations
  console.log("CONVERSATIONS RESULT", conversations)

  return (
    <nav className="msg-navigation">
      <div className="msg-nav-container">
        <div className="messages-filter-container">
          <Searchbar />
        </div>
        <ul className="msg-nav-menu">
          {conversations.map(conversation => {
            const usernames = conversation.users.map(user => user.username)
            const linkTo = `/messages/${conversation.id}`
            return (
              <li className="msg-nav-item" key={conversation.id}>
                <NavLink exact to={linkTo} activeClassName="msg-active" className="msg-nav-links" onClick={() => setShowContacts(false)}>
                  • {usernames}
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